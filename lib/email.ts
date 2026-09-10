// lib/email.ts - Admin notification emails (Resend-backed)
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Resend's shared sandbox sender ("onboarding@resend.dev") works without verifying
// a custom domain, but will ONLY deliver to the address the Resend account was
// signed up with, which for this account is vishal.buildss@gmail.com. Anything
// else is rejected with a 403 validation_error and the notification is lost, so
// ADMIN_NOTIFICATION_EMAIL must stay on that address until the domain is verified.
//
// To notify customeai.tech@gmail.com (or send mail to clients at all), verify
// customeai.tech at resend.com/domains, then set:
//   RESEND_FROM_EMAIL=notifications@customeai.tech
//   ADMIN_NOTIFICATION_EMAIL=customeai.tech@gmail.com
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "customeai.tech@gmail.com";

export async function sendAdminNotification(subject: string, html: string): Promise<void> {
  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY is not set — skipping admin notification email:", subject);
    return;
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject,
      html,
    });
    // The Resend SDK returns API-level failures (bad key, unverified domain, etc.)
    // as a `{ error }` field rather than throwing.
    if (result.error) {
      console.error("❌ Resend rejected admin notification email:", result.error);
    } else {
      console.log("✅ Admin notification email sent:", subject, "id:", result.data?.id);
    }
  } catch (error) {
    // Notification failures must never break the underlying request (form
    // submission / payment) that triggered them.
    console.error("❌ Failed to send admin notification email:", error);
  }
}

export function newConsultationEmail(data: {
  name: string;
  business: string;
  contact: string;
  message: string;
}): { subject: string; html: string } {
  return {
    subject: `New consultation request from ${data.name}`,
    html: `
      <h2>New consultation request</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Business:</strong> ${escapeHtml(data.business)}</p>
      <p><strong>Contact:</strong> ${escapeHtml(data.contact)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    `,
  };
}

export function paymentReceivedEmail(data: {
  tierName: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}): { subject: string; html: string } {
  const displayAmount = `${data.currency === "INR" ? "₹" : "$"}${data.amount.toLocaleString()}`;
  return {
    subject: `💰 Payment received: ${displayAmount} (${data.tierName})`,
    html: `
      <h2>Payment received</h2>
      <p><strong>Package:</strong> ${escapeHtml(data.tierName)}</p>
      <p><strong>Amount:</strong> ${displayAmount}</p>
      <p><strong>Razorpay Order ID:</strong> ${escapeHtml(data.razorpayOrderId)}</p>
      <p><strong>Razorpay Payment ID:</strong> ${escapeHtml(data.razorpayPaymentId)}</p>
    `,
  };
}

function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
