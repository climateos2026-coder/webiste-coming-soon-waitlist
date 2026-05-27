'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const launchDate = new Date('2026-10-10T10:00:00Z').getTime();

function useCountdown() {
  const now = Date.now();
  const delta = Math.max(launchDate - now, 0);
  const dayMs = 1000 * 60 * 60 * 24;
  const hourMs = 1000 * 60 * 60;
  const minuteMs = 1000 * 60;

  const days = Math.floor(delta / dayMs);
  const hours = Math.floor((delta % dayMs) / hourMs);
  const minutes = Math.floor((delta % hourMs) / minuteMs);

  return { days, hours, minutes };
}

const typedWords = ['planetary resilience', 'climate intelligence', 'deployable impact'];

export function ClimateComingSoon() {
  const countdown = useCountdown();
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const word = typedWords[wordIndex];
    const timeout = setTimeout(() => {
      setTypedText((prev) => {
        if (prev.length === word.length) {
          setTimeout(() => {
            setTypedText('');
            setWordIndex((idx) => (idx + 1) % typedWords.length);
          }, 1100);
          return prev;
        }
        return word.slice(0, prev.length + 1);
      });
    }, 55);
    return () => clearTimeout(timeout);
  }, [typedText, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowPopup(true), 2200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#050712] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.2),transparent_30%),radial-gradient(circle_at_45%_78%,rgba(45,212,191,0.18),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(251,146,60,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.08)_45%,transparent_60%)] bg-[length:250%_250%] animate-[aurora_16s_ease-in-out_infinite]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-20 pt-28 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100"
            >
              ClimateOS 2026
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl font-extrabold leading-tight md:text-7xl"
            >
              Build for the
              <span className="block bg-gradient-to-r from-cyan-300 via-indigo-200 to-violet-300 bg-clip-text text-transparent">
                climate frontier
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-lg text-slate-100/90"
            >
              Build with global teams for{' '}
              <span className="font-semibold text-cyan-200">
                {typedText}
                <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-cyan-200 align-middle" />
              </span>
              .
            </motion.p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tracks"
                className="rounded-xl bg-gradient-to-r from-cyan-300 to-indigo-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(56,189,248,0.3)] transition hover:-translate-y-0.5"
              >
                Explore Tracks
              </Link>
              <Link
                href="/recruitment"
                className="rounded-xl border border-violet-200/30 bg-violet-300/10 px-6 py-3 text-sm font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:bg-violet-300/20"
              >
                Join Core Team
              </Link>
            </div>

            <div className="grid max-w-md grid-cols-3 gap-3">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100/15 bg-slate-950/60 p-4 text-center backdrop-blur">
                  <p className="font-stat text-3xl font-bold text-cyan-200">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mx-auto h-[420px] w-[420px] max-w-full"
          >
            <div className="orbit-ring absolute inset-2 rounded-full border border-sky-100/15" />
            <div className="orbit-ring absolute inset-[-14px] rounded-full border border-violet-100/15 [animation-duration:20s]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/35 via-indigo-400/20 to-fuchsia-500/25 blur-2xl" />
            <div className="earth-sphere absolute inset-8 rounded-full border border-sky-100/25">
              <div className="earth-atmosphere absolute inset-0 rounded-full" />
              <div className="earth-texture absolute inset-0 rounded-full" />
              <div className="earth-clouds absolute inset-0 rounded-full" />
              <div className="earth-shadow absolute inset-0 rounded-full" />
            </div>
            <div className="absolute left-2 top-10 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(125,211,252,0.9)]" />
            <div className="absolute bottom-24 right-8 h-2 w-2 rounded-full bg-violet-200 shadow-[0_0_16px_rgba(196,181,253,0.95)]" />
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 pb-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-100/15 bg-[#0a0f1c]/80 p-6 backdrop-blur md:p-10"
        >
          <h2 className="font-display text-3xl font-bold text-cyan-100">Global Climate Builder Network</h2>
          <p className="mt-2 max-w-3xl text-slate-200/75">
            ClimateOS connects builders, researchers, and climate operators to create software and systems
            that are deployable in real contexts. Explore tracks, join the recruitment flow, and partner as a sponsor.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              ['Tracks', 'Deep problem statements with practical solution spaces.'],
              ['Recruitment', 'Core team and volunteer opportunities are open.'],
              ['Sponsorship', 'Structured partner packages for meaningful activation.'],
            ].map(([title, description]) => (
              <article key={title} className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-4">
                <h3 className="font-display text-xl font-bold text-cyan-100">{title}</h3>
                <p className="mt-2 text-sm text-slate-200/80">{description}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      {showPopup && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-4 right-4 z-40 max-w-xs rounded-2xl border border-cyan-200/30 bg-[#0a1430]/90 p-4 backdrop-blur-xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Direct Contact</p>
          <p className="mt-1 text-sm text-cyan-50">Official email: climateos26@gmail.com</p>
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            className="mt-3 text-xs font-semibold text-cyan-200 hover:text-cyan-100"
          >
            Dismiss
          </button>
        </motion.aside>
      )}
    </main>
  );
}
