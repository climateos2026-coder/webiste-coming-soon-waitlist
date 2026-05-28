'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Lock, HelpCircle, Sparkles, Mail, ArrowLeft } from 'lucide-react';

export default function TracksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-site-bg pt-20 transition-colors duration-300 relative flex flex-col justify-between">
        {/* Futuristic glowing radial background lines/auroras */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,var(--glow-1),transparent_35%),radial-gradient(circle_at_80%_10%,var(--glow-2),transparent_30%),radial-gradient(circle_at_50%_50%,var(--glow-3),transparent_40%)] pointer-events-none transition-colors duration-300" />
        
        <section className="relative flex-grow flex items-center justify-center mx-auto max-w-4xl w-full px-4 py-16 md:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.1 }}
            className="w-full rounded-3xl border border-site-border bg-site-card p-8 md:p-12 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-primary/20"
          >
            {/* Glowing accents inside the mystery card */}
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-60 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
            <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-accent/5 blur-3xl opacity-60 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

            {/* Glowing interactive mystery icon stack */}
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-site-card border border-site-border relative mb-8 shadow-inner">
              {/* Outer rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute inset-[-6px] rounded-full border border-dashed border-primary/30"
              />
              {/* Inner pulsing glow */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute inset-2 rounded-full bg-primary/10 blur-md"
              />
              
              <div className="relative flex items-center justify-center">
                <Lock className="h-10 w-10 text-primary drop-shadow-[0_0_10px_rgba(11,110,90,0.4)]" />
                <HelpCircle className="h-6 w-6 text-accent absolute -right-2 -bottom-2 bg-site-card rounded-full p-0.5 border border-site-border" />
              </div>
            </div>

            {/* Category / Status Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary mb-6 shadow-sm">
              <Sparkles size={12} className="animate-spin-slow" />
              Mystery Phase
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl font-extrabold text-site-text md:text-5xl tracking-tight transition-colors duration-300 mb-6">
              Shrouded in Mystery
            </h1>

            {/* Premium, exciting narrative text */}
            <div className="max-w-2xl mx-auto space-y-4 text-site-muted leading-relaxed text-base md:text-lg">
              <p>
                In the spirit of rapid adaptation, real-world readiness, and pure engineering innovation, the hackathon tracks for <span className="font-semibold text-site-text">ClimateOS 2026</span> are kept completely under wraps.
              </p>
              <p className="text-sm md:text-base opacity-90">
                To test the true capabilities of our builders, the specific problem statements, curated datasets, and deployment requirements will remain locked until the virtual campus opens. Prepare your frameworks, configure your environments, and stay agile—the challenge will demand everything you have.
              </p>
            </div>

            {/* Separator line */}
            <div className="my-8 border-t border-site-border/30 max-w-lg mx-auto" />

            {/* Teaser stats grid */}
            <div className="grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto mb-10 text-left">
              <div className="rounded-2xl border border-site-border bg-site-card-elevated p-4 backdrop-blur transition-all duration-300 hover:border-primary/10">
                <span className="text-2xl mb-1 block">🌍</span>
                <h4 className="font-bold text-site-text text-sm">5 Core Domains</h4>
                <p className="text-xs text-site-muted mt-1 leading-relaxed">Spanning critical global systems & resilience targets.</p>
              </div>
              <div className="rounded-2xl border border-site-border bg-site-card-elevated p-4 backdrop-blur transition-all duration-300 hover:border-primary/10">
                <span className="text-2xl mb-1 block">📊</span>
                <h4 className="font-bold text-site-text text-sm">Curated Data</h4>
                <p className="text-xs text-site-muted mt-1 leading-relaxed">High-resolution telemetry, weather forecasts & APIs.</p>
              </div>
              <div className="rounded-2xl border border-site-border bg-site-card-elevated p-4 backdrop-blur transition-all duration-300 hover:border-primary/10">
                <span className="text-2xl mb-1 block">🚀</span>
                <h4 className="font-bold text-site-text text-sm">Real Deployments</h4>
                <p className="text-xs text-site-muted mt-1 leading-relaxed">Outcome-driven build sprint directly targeting climate action.</p>
              </div>
            </div>

            {/* Interactive button layout */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-site-border bg-site-card hover:bg-site-card-elevated px-6 py-3.5 text-sm font-semibold text-site-text transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
              <a
                href="mailto:climateos26@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(11,110,90,0.2)] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail size={16} />
                Ask Questions
              </a>
            </div>

            {/* Footer contact info on card */}
            <p className="mt-8 text-xs text-site-muted-dark font-medium flex items-center justify-center gap-1.5">
              <span>Need clarification? Reach out directly:</span>
              <a href="mailto:climateos26@gmail.com" className="text-primary hover:underline">
                climateos26@gmail.com
              </a>
            </p>
          </motion.div>
        </section>
        
        <Footer />
      </main>
    </>
  );
}