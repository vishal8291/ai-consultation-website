import { Lock } from "lucide-react";

/**
 * Trust badge for the checkout buttons. Every payment on the site goes
 * through Razorpay (order created and signature verified server-side), so
 * this names the real gateway rather than a generic "secure checkout".
 * `compact` is the single-line form used under a Buy button.
 */
export default function SecuredByRazorpay({ compact = false }: { compact?: boolean }) {
  const brand = (
    <span className="inline-flex items-center gap-1.5">
      <img src="/images/razorpay.svg" alt="" width={16} height={16} className="w-4 h-4" />
      <span className="font-semibold text-slate-900 tracking-tight">Razorpay</span>
    </span>
  );

  if (compact) {
    return (
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Secure payment by</span>
        {brand}
      </p>
    );
  }

  return (
    <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-[var(--border-default)] bg-[var(--surface-card)] px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-alt)]">
          <img src="/images/razorpay.svg" alt="" width={20} height={20} className="w-5 h-5" />
        </span>
        <div>
          <p className="text-sm text-slate-600">
            Payments secured by <span className="font-semibold text-slate-900">Razorpay</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Encrypted checkout. Card and bank details never touch our servers.
          </p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
        {["UPI", "Cards", "Net banking"].map((m) => (
          <li
            key={m}
            className="rounded-full border border-[var(--border-default)] bg-[var(--surface-alt)] px-3 py-1 text-xs font-semibold text-slate-700"
          >
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
