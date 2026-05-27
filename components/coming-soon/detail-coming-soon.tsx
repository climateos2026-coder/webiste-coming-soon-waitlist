import Link from 'next/link';

type DetailComingSoonProps = {
  title: string;
  description: string;
  badge?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function DetailComingSoon({
  title,
  description,
  badge = 'Coming soon',
  primaryHref = '/register',
  primaryLabel = 'Join Waitlist',
  secondaryHref = '/contact',
  secondaryLabel = 'Contact Organizers',
}: DetailComingSoonProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(52,211,153,0.16),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-4xl px-4 py-24">
        <div className="rounded-3xl border border-emerald-100/20 bg-[#071613]/80 p-8 backdrop-blur md:p-12">
          <span className="inline-flex rounded-full border border-emerald-200/25 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-100">
            {badge}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-emerald-50 md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-emerald-50/75">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-xl border border-emerald-100/30 px-5 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-100/10"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
