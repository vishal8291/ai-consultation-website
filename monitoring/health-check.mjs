// monitoring/health-check.mjs
// External uptime + security-invariant monitor for all live CustomeAI sites.
// Runs on GitHub Actions (see .github/workflows/uptime.yml), independent of
// Vercel, so it can detect customeai.tech/Vercel itself being down.
//
// Emails via Resend ONLY on a state change (healthy->down, down->healthy) plus
// one daily "all healthy" heartbeat — never a message on every run.
//
// State is a tiny JSON file persisted between runs by the GitHub Actions cache.
// Env: RESEND_API_KEY (required to send), STATE_FILE (path, optional).
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "sites.json"), "utf8"));
const STATE_FILE = process.env.STATE_FILE || path.join(__dirname, "state", "last.json");
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, "utf8")); }
  catch { return { overall: "unknown", lastHeartbeatDate: "" }; }
}
function saveState(s) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2));
}
function istNow() {
  return new Date(Date.now() + (5 * 60 + 30) * 60 * 1000); // shift UTC -> IST
}
function istParts() {
  const d = istNow();
  return { date: d.toISOString().slice(0, 10), hour: d.getUTCHours(),
    pretty: d.toISOString().slice(0, 16).replace("T", " ") + " IST" };
}

async function runCheck(c) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const r = await fetch(c.url, { redirect: "manual", signal: ctrl.signal,
      headers: { "User-Agent": "CustomeAI-HealthCheck/1.0" } });
    clearTimeout(t);
    return { c, status: r.status, ok: c.expect.includes(r.status) };
  } catch (e) {
    return { c, status: null, ok: false, error: e.message };
  }
}

function rowsHtml(results) {
  return results.map((r) => {
    const mark = r.ok ? "✅" : "⚠️";
    const got = r.status === null ? `no response (${r.error})` : `HTTP ${r.status}`;
    const note = r.ok ? "" : ` — ${r.c.meaning}`;
    return `<tr><td style="padding:6px 10px;">${mark}</td><td style="padding:6px 10px;color:#475569;">${r.c.site}</td><td style="padding:6px 10px;">${r.c.label}</td><td style="padding:6px 10px;font-family:monospace;">${got}${r.ok ? "" : " (want " + r.c.expect.join("/") + ")"}</td><td style="padding:6px 10px;color:#b45309;">${note}</td></tr>`;
  }).join("");
}

async function sendEmail(subject, headline, headColor, results, intro) {
  if (!RESEND_API_KEY) { console.log("(no RESEND_API_KEY — skipping email)"); return; }
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;"><h2 style="color:${headColor};">${headline}</h2><p style="color:#475569;">${intro}</p><table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e2e8f0;"><tbody>${rowsHtml(results)}</tbody></table><p style="color:#94a3b8;font-size:12px;margin-top:16px;">CustomeAI external monitoring · GitHub Actions · every ~10 min</p></div>`;
  const res = await fetch("https://api.resend.com/emails", { method: "POST",
    headers: { Authorization: "Bearer " + RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ from: cfg.from, to: cfg.notifyTo, subject, html }) });
  console.log("email:", res.status, (await res.text()).slice(0, 120));
}

(async () => {
  const results = await Promise.all(cfg.checks.map(runCheck));
  const failures = results.filter((r) => !r.ok);
  const healthy = failures.length === 0;
  const { date, hour, pretty } = istParts();

  results.forEach((r) => console.log(`${r.ok ? "OK " : "FAIL"} ${r.c.site} ${r.c.label} -> ${r.status ?? r.error}`));

  const prev = loadState();
  const next = { ...prev, overall: healthy ? "healthy" : "down", lastChecked: pretty };

  if (!healthy && prev.overall !== "down") {
    // Newly gone down (or first-ever run finding a problem)
    await sendEmail(`🔴 SITE ALERT — ${failures.length} issue${failures.length > 1 ? "s" : ""} (${pretty})`,
      `${failures.length} issue(s) detected`, "#dc2626", results,
      `A problem was just detected at ${pretty}. This is an immediate alert; you will get a recovery notice when it clears.`);
  } else if (healthy && prev.overall === "down") {
    // Recovered
    await sendEmail(`🟢 RECOVERED — all sites healthy again (${pretty})`,
      "All sites healthy again", "#16a34a", results,
      `Everything is back to normal as of ${pretty}.`);
    next.lastHeartbeatDate = date; // recovery doubles as today's heartbeat
  } else if (process.env.FORCE_HEARTBEAT === "1") {
    // Manual test trigger (workflow_dispatch) — prove the CI email path works
    // on demand regardless of time or state.
    await sendEmail(`✅ Site check (manual test) — ${healthy ? "all healthy" : failures.length + " issue(s)"} (${pretty})`,
      healthy ? "All sites healthy" : `${failures.length} issue(s) found`,
      healthy ? "#16a34a" : "#dc2626", results,
      `Manual test run at ${pretty}. This confirms the GitHub Actions monitor can reach you.`);
  } else if (healthy && hour === cfg.heartbeatHourIST && prev.lastHeartbeatDate !== date) {
    // Once-a-day "still healthy, monitor is alive" heartbeat
    await sendEmail(`✅ Daily site check — all healthy (${pretty})`,
      "All sites healthy", "#16a34a", results,
      `Daily heartbeat at ${pretty}. All ${results.length} checks passed.`);
    next.lastHeartbeatDate = date;
  } else {
    console.log(healthy ? "healthy, no notification needed" : "still down, alert already sent");
  }

  saveState(next);
  process.exit(0); // never fail the job on a site outage; the email is the signal
})();
