// app/api/cron/health-check/route.ts
// Daily automated health check of all live production sites, run by Vercel Cron
// (see vercel.json). Emails a digest to the business inbox via Resend. Each
// check encodes an invariant learned from the pre-launch security audit, so a
// regression (admin panel opening up, secrets exposed) pages us, not just plain
// downtime.
import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification } from "@/lib/email";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface Check {
  site: string;
  label: string;
  url: string;
  method?: string;
  // A response is healthy only if its status is in this list.
  expect: number[];
  // Human explanation of what a failure means.
  meaning: string;
}

const CHECKS: Check[] = [
  // --- CustomeAI (Next.js on Vercel) ---
  { site: "customeai.tech", label: "Homepage", url: "https://customeai.tech/", expect: [200], meaning: "Site is down or erroring" },
  { site: "customeai.tech", label: "Consultation API", url: "https://customeai.tech/api/consultation", expect: [401], meaning: "Lead-capture API is broken (should require auth, not 500)" },
  // --- MAHAGRO INDIA (Vite + PHP on Hostinger/Cloudflare) ---
  { site: "mahagroindia.com", label: "Homepage", url: "https://mahagroindia.com/", expect: [200], meaning: "Site is down or erroring" },
  { site: "mahagroindia.com", label: "Stats API", url: "https://mahagroindia.com/backend/api/stats.php", expect: [200], meaning: "PHP backend is down" },
  { site: "mahagroindia.com", label: "Admin panel lock", url: "https://mahagroindia.com/backend/admin/", expect: [401], meaning: "SECURITY: admin panel with customer PII is no longer password-protected" },
  { site: "mahagroindia.com", label: "Secret file lock", url: "https://mahagroindia.com/backend/.env.php", expect: [403, 404], meaning: "SECURITY: server config/secrets file is publicly reachable" },
];

async function runCheck(c: Check): Promise<{ check: Check; status: number | null; ok: boolean; error?: string }> {
  try {
    const res = await fetch(c.url, {
      method: c.method || "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "CustomeAI-HealthCheck/1.0" },
    });
    return { check: c, status: res.status, ok: c.expect.includes(res.status) };
  } catch (err: any) {
    return { check: c, status: null, ok: false, error: err?.message || "request failed" };
  }
}

export async function GET(req: NextRequest) {
  // Vercel automatically attaches `Authorization: Bearer <CRON_SECRET>` to cron
  // invocations when CRON_SECRET is set. Reject anything else so the endpoint
  // can't be triggered (or spammed) by the public.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const results = await Promise.all(CHECKS.map(runCheck));
  const failures = results.filter((r) => !r.ok);
  const healthy = failures.length === 0;

  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

  const rows = results
    .map((r) => {
      const mark = r.ok ? "✅" : "⚠️";
      const got = r.status === null ? `no response (${r.error})` : `HTTP ${r.status}`;
      const expect = r.check.expect.join(" or ");
      const note = r.ok ? "" : ` — ${r.check.meaning}`;
      return `<tr>
        <td style="padding:6px 10px;">${mark}</td>
        <td style="padding:6px 10px;color:#475569;">${r.check.site}</td>
        <td style="padding:6px 10px;">${r.check.label}</td>
        <td style="padding:6px 10px;font-family:monospace;">${got}${r.ok ? "" : ` (want ${expect})`}</td>
        <td style="padding:6px 10px;color:#b45309;">${note}</td>
      </tr>`;
    })
    .join("");

  const subject = healthy
    ? `✅ Daily site check — all healthy (${now})`
    : `⚠️ Daily site check — ${failures.length} issue${failures.length > 1 ? "s" : ""} (${now})`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;">
      <h2 style="color:${healthy ? "#16a34a" : "#dc2626"};">${healthy ? "All sites healthy" : `${failures.length} issue(s) found`}</h2>
      <p style="color:#475569;">Automated check at ${now} (IST). ${results.length} checks across your live sites.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e2e8f0;">
        <thead><tr style="background:#f8fafc;text-align:left;">
          <th style="padding:6px 10px;"></th><th style="padding:6px 10px;">Site</th>
          <th style="padding:6px 10px;">Check</th><th style="padding:6px 10px;">Result</th><th style="padding:6px 10px;">Note</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="color:#94a3b8;font-size:12px;margin-top:16px;">CustomeAI automated monitoring · runs daily via Vercel Cron</p>
    </div>`;

  await sendAdminNotification(subject, html);

  return NextResponse.json({ healthy, checked: results.length, failures: failures.length,
    results: results.map((r) => ({ site: r.check.site, label: r.check.label, status: r.status, ok: r.ok })) });
}
