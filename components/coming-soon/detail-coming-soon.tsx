'use client';

import Link from 'next/link';
import { AuraBackground } from '@/components/layout/aura-background';

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
  primaryHref = '/faq',
  primaryLabel = 'Read FAQ',
  secondaryHref = '/tracks',
  secondaryLabel = 'Explore Tracks',
}: DetailComingSoonProps) {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center bg-site-bg transition-colors duration-300">
      <AuraBackground variant="accent" />

      <div className="relative mx-auto max-w-4xl w-full px-4 py-16">
        <div
          className="rounded-3xl border border-site-border bg-site-card p-8 backdrop-blur-md md:p-12 shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden group animate-[fadeInUp_0.6s_ease-out_both]"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-opacity group-hover:opacity-100" />

          <span className="inline-flex rounded-full border border-site-border-strong bg-site-card-elevated px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-primary transition-colors animate-[fadeIn_0.4s_ease-out_0.15s_both]">
            {badge}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold text-site-text md:text-5xl tracking-tight transition-colors leading-tight animate-[fadeInUp_0.5s_ease-out_0.25s_both]">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-site-muted transition-colors leading-relaxed text-base md:text-lg animate-[fadeInUp_0.5s_ease-out_0.35s_both]">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 animate-[fadeInUp_0.5s_ease-out_0.45s_both]">
            <Link
              href={primaryHref}
              className="rounded-xl bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent px-6 py-3.5 text-sm font-bold text-[#102033] shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-accent/20"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-xl border border-site-border bg-site-card hover:bg-site-card-elevated px-6 py-3.5 text-sm font-semibold text-site-text shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:border-site-border-strong"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
