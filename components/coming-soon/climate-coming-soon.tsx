'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AuraBackground } from '@/components/layout/aura-background';
import { ClimateGlobe } from '@/components/sections/climate-globe';

const typedWords = ['planetary resilience', 'climate intelligence', 'deployable impact', 'decentralized energy', 'urban heat relief'];

export function ClimateComingSoon() {
  const [typedText, setTypedText] = useState(typedWords[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const word = typedWords[wordIndex];
    const timeout = setTimeout(() => {
      setTypedText((prev) => {
        if (prev.length === word.length) {
          setTimeout(() => {
            setTypedText('');
            setWordIndex((idx) => (idx + 1) % typedWords.length);
          }, 1500);
          return prev;
        }
        return word.slice(0, prev.length + 1);
      });
    }, 55);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion, typedText, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowPopup(true), 2200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden bg-site-bg text-site-text transition-colors duration-300">
      {/* Dynamic theme-adapting radial background aura */}
      <AuraBackground variant="mixed" />
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-75 [background:linear-gradient(120deg,transparent_30%,var(--border-default)_45%,transparent_60%)] bg-[length:250%_250%] animate-[aurora_16s_ease-in-out_infinite] transition-colors duration-300" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-20 pt-28 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-7 z-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex rounded-full border border-site-border-strong bg-site-card-elevated px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors duration-300 shadow-sm"
            >
              ClimateOS 2026
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl font-extrabold leading-tight md:text-7xl tracking-tight"
            >
              Build for the
              <span className="block bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent transition-all duration-300">
                climate frontier
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-lg text-site-muted transition-colors duration-300"
            >
              Build with global teams for{' '}
              <span className="font-semibold text-primary transition-colors duration-300">
                {typedText}
                <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-primary align-middle" />
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/tracks"
                className="rounded-xl bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent px-6 py-3 text-sm font-bold text-[#102033] shadow-[0_14px_40px_rgba(244,100,61,0.25)] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Tracks
              </Link>
              <Link
                href="/recruitment"
                className="rounded-xl border border-site-border bg-site-card hover:bg-site-card-elevated px-6 py-3 text-sm font-semibold text-site-text transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                Join Core Team
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-2xl border border-site-border bg-site-card p-5 text-center backdrop-blur-md max-w-sm shadow-[0_8px_32px_0_rgba(54,91,120,0.08)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-accent/5" />
              <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
              <div className="absolute -right-12 -bottom-12 h-24 w-24 rounded-full bg-accent/5 blur-xl pointer-events-none" />

              <p className="relative font-display text-sm font-semibold tracking-wider text-primary uppercase transition-colors duration-300">
                Countdown coming soon
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mx-auto h-[420px] w-[420px] max-w-full flex items-center justify-center z-0"
          >
            <ClimateGlobe reducedMotion={Boolean(prefersReducedMotion)} />
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 pb-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.15 }}
          className="rounded-3xl border border-site-border bg-site-card p-6 backdrop-blur md:p-10 transition-colors duration-300"
        >
          <h2 className="font-display text-3xl font-bold text-primary transition-colors duration-300">Global Climate Builder Network</h2>
          <p className="mt-2 max-w-3xl text-site-muted transition-colors duration-300">
            ClimateOS connects builders, researchers, and climate operators to create software and systems
            that are deployable in real contexts. Explore tracks, join the recruitment flow, and partner as a sponsor.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Tracks', 'Kept entirely under wraps—the challenge is a mystery.'],
              ['Recruitment', 'Core team and volunteer opportunities are open.'],
              ['Sponsorship', 'Structured partner packages for meaningful activation.'],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-xl border border-site-border bg-site-card-elevated p-5 hover:border-primary/20 hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-display text-xl font-bold text-primary transition-colors duration-300">{title}</h3>
                <p className="mt-2 text-sm text-site-muted transition-colors duration-300">{description}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      {showPopup && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-4 right-4 z-40 max-w-xs rounded-2xl border border-site-border bg-site-card p-4 backdrop-blur-xl shadow-xl transition-all duration-300"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary transition-colors duration-300">Direct Contact</p>
          <p className="mt-1 text-sm text-site-text transition-colors duration-300">Official email: climateos26@gmail.com</p>
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            className="mt-3 text-xs font-semibold text-primary hover:opacity-85 transition-opacity"
          >
            Dismiss
          </button>
        </motion.aside>
      )}
    </section>
  );
}
