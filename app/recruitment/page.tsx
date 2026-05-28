'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, ClipboardList, ArrowRight, Sparkles } from 'lucide-react';

export default function RecruitmentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-site-bg pt-20 transition-colors duration-300">
        <section className="relative overflow-hidden flex items-center justify-center">
          {/* Subtle glowing radial background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,var(--glow-3),transparent_35%),radial-gradient(circle_at_80%_15%,var(--glow-1),transparent_35%)] transition-colors duration-300" />
          
          <div className="relative mx-auto max-w-5xl px-4 py-16 w-full z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', duration: 0.8, bounce: 0.1 }}
              className="rounded-3xl border border-site-border bg-site-card p-8 backdrop-blur md:p-12 shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative radial overlay */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl transition-opacity group-hover:opacity-100" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-site-border-strong bg-site-card-elevated px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 dark:text-cyan-200 transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />
                    Recruitment now open
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-6 font-display text-4xl font-extrabold text-site-text md:text-5xl tracking-tight transition-colors leading-tight"
                  >
                    Join the ClimateOS 2026 team
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-4 max-w-2xl text-site-muted transition-colors leading-relaxed text-base md:text-lg"
                  >
                    We are hiring both core team members and volunteers to help run a world-class online
                    climate-tech hackathon.
                  </motion.p>
                </div>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <motion.a
                  href="https://forms.gle/y5aZGLeeGJhb94L28"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-site-border bg-site-card-elevated p-6 md:p-8 hover:border-cyan-500/25 transition-all duration-300 shadow-sm block group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors duration-300" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-200/70 group-hover:text-cyan-500 font-bold transition-colors">
                      Core Team
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-site-text group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
                    Join the core team <ArrowRight className="h-5 w-5 text-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </h2>
                  <p className="mt-3 text-sm text-site-muted leading-relaxed group-hover:text-site-text transition-colors duration-300">
                    Operations, execution, product, design, and event leadership roles. Take charge of key verticals.
                  </p>
                </motion.a>

                <motion.a
                  href="https://forms.gle/BRSETWJzKd5ypPYQ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', delay: 0.45 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-site-border bg-site-card-elevated p-6 md:p-8 hover:border-indigo-500/25 transition-all duration-300 shadow-sm block group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors duration-300" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-300">
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-200/70 group-hover:text-indigo-500 font-bold transition-colors">
                      Volunteering
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-site-text group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
                    Become a volunteer <ArrowRight className="h-5 w-5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </h2>
                  <p className="mt-3 text-sm text-site-muted leading-relaxed group-hover:text-site-text transition-colors duration-300">
                    Help with Discord moderation, support desk, participant onboarding, and final evaluation logistics.
                  </p>
                </motion.a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-12 flex justify-start"
              >
                <Link
                  href="/tracks"
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 hover:shadow-cyan-500/10"
                >
                  Explore track domains <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

