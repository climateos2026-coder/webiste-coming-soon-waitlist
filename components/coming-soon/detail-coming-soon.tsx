'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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
      {/* Animated subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,var(--glow-3),transparent_35%),radial-gradient(circle_at_80%_15%,var(--glow-1),transparent_35%)] transition-colors duration-300" />
      
      <div className="relative mx-auto max-w-4xl w-full px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0.15 }}
          className="rounded-3xl border border-site-border bg-site-card p-8 backdrop-blur-md md:p-12 shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 relative overflow-hidden group"
        >
          {/* Inner radial highlight */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl transition-opacity group-hover:opacity-100" />
          
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex rounded-full border border-site-border-strong bg-site-card-elevated px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-cyan-600 dark:text-cyan-200 transition-colors"
          >
            {badge}
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 font-display text-4xl font-extrabold text-site-text md:text-5xl tracking-tight transition-colors leading-tight"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-4 max-w-2xl text-site-muted transition-colors leading-relaxed text-base md:text-lg"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href={primaryHref}
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-cyan-500/20"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-xl border border-site-border bg-site-card hover:bg-site-card-elevated px-6 py-3.5 text-sm font-semibold text-site-text shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:border-site-border-strong"
            >
              {secondaryLabel}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

