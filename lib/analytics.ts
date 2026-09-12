// lib/analytics.ts
// Thin wrapper over gtag so conversion events are fired from one place and are
// safe to call anywhere (no-ops on the server, or if GA hasn't loaded / is
// blocked by an ad-blocker). GA4's automatic enhanced-measurement form_submit
// does not fire on our React forms (they preventDefault + fetch, no page
// navigation), which is why GA showed form_start but zero completions despite
// real submissions landing in the database. These explicit events close that gap.
type GtagParams = Record<string, unknown>;

function gtagAvailable(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  return typeof fn === "function" ? fn : null;
}

export function trackEvent(event: string, params: GtagParams = {}): void {
  const gtag = gtagAvailable();
  if (!gtag) return;
  gtag("event", event, params);
}

// A lead was captured (consultation form or quote widget).
// Mark `generate_lead` as a Key Event in GA4 to measure lead conversion rate.
//
// The parameter is named lead_source, not source: GA4 treats a custom event
// parameter literally named "source" as special (it overlaps the platform's
// own source/medium attribution model), which is why the "Sessions by
// session manual source" report showed a phantom source called
// "consultation_form" — that was this parameter's value, not a real
// browsing session referrer.
export function trackLead(leadSource: string, params: GtagParams = {}): void {
  trackEvent("generate_lead", { lead_source: leadSource, ...params });
}

// An advance payment was completed. Mark `purchase` as a Key Event in GA4 to
// measure revenue and channel ROI.
export function trackPurchase(args: {
  transactionId: string;
  value: number;
  currency: string;
  tierName: string;
}): void {
  trackEvent("purchase", {
    transaction_id: args.transactionId,
    value: args.value,
    currency: args.currency,
    items: [{ item_name: `${args.tierName} (50% advance)` }],
  });
}
