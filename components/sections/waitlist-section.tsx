'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Info, ChevronDown, Loader2 } from 'lucide-react';
import { WaitlistForm } from '@/components/forms/waitlist-form';

const FOUNDER_TIP_KEY = 'climateos_waitlist_founder_tip_dismissed';

export function WaitlistSection() {
  const [formState, setFormState] = useState<'loading' | 'form' | 'success' | 'error'>('loading');
  const [showDirectLink, setShowDirectLink] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFormState('form'), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(FOUNDER_TIP_KEY);
    if (!dismissed) {
      const tipTimer = setTimeout(() => setShowDirectLink(true), 3000);
      return () => clearTimeout(tipTimer);
    }
  }, []);

  const handleError = useCallback(() => {
    setFormState('error');
  }, []);

  const handleRetry = useCallback(() => {
    setFormState('form');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setFormState('form'), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(FOUNDER_TIP_KEY);
    if (!dismissed) {
      const tipTimer = setTimeout(() => setShowDirectLink(true), 3000);
      return () => clearTimeout(tipTimer);
    }
  }, []);

  const dismissFounderTip = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FOUNDER_TIP_KEY, 'true');
    }
    setShowDirectLink(false);
  };

  return (
    <section id="waitlist" className="relative w-full max-w-7xl mx-auto px-4 pb-28 pt-10 md:px-8 z-10">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mb-12 space-y-4"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-site-border bg-site-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Join the waitlist
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Get event updates
          </h2>
          <p className="text-site-muted text-base md:text-lg">
            Sign up to receive updates when applications open. Be the first to know about tracks, dates, and how to participate in the global climate tech hackathon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-3xl rounded-3xl border border-site-border bg-site-card/50 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-site-border-strong"
        >
          <div className="relative min-h-[640px] w-full bg-site-card-elevated/40 flex flex-col">
            <AnimatePresence mode="wait">
              {formState === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-site-bg/95 p-6 text-center"
                >
                  <div className="relative flex items-center justify-center mb-6">
                    <div className="absolute h-16 w-16 rounded-full border border-primary/20 animate-ping" />
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  </div>
                  <p className="font-display text-lg font-bold text-site-text tracking-wide">
                    Loading registration form
                  </p>
                  <p className="mt-1 text-sm text-site-muted">
                    One moment please...
                  </p>
                </motion.div>
              )}

              {formState === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 flex flex-col items-center justify-center p-8 text-center min-h-[640px]"
                >
                  <div className="rounded-full bg-primary-soft/20 p-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-3xl">✓</span>
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-primary">
                    You are on the waitlist
                  </h3>
                  <p className="mt-3 text-site-text/80 max-w-md">
                    We will send launch updates and next steps to your inbox. Applications open July 21, 2026.
                  </p>
                  <p className="mt-2 text-sm text-primary font-semibold">
                    Contact: climateos26@gmail.com
                  </p>
                </motion.div>
              )}

              {formState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 flex flex-col items-center justify-center p-8 text-center min-h-[640px]"
                >
                  <div className="rounded-full bg-error/10 p-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-error/20 flex items-center justify-center">
                      <span className="text-3xl">!</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-error">
                    Submission failed
                  </h3>
                  <p className="mt-3 text-site-text/80 max-w-md">
                    Something went wrong. Please try again, or contact us directly at climateos26@gmail.com.
                  </p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-6 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-white font-bold shadow-md hover:from-primary-hover hover:to-accent-hover transition-all"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {formState === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 p-6 md:p-8"
                >
                  <WaitlistForm onSuccess={handleSuccess} onError={handleError} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-site-border px-6 py-4 bg-site-card-elevated/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="text-xs text-site-muted-dark">
              Having trouble? Email us directly.
            </span>
            <button
              type="button"
              onClick={() => window.location.href = 'mailto:climateos26@gmail.com'}
              className="inline-flex items-center gap-1.5 rounded-lg border border-site-border bg-site-card hover:bg-site-card-elevated px-3 py-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-all hover:scale-[1.02]"
            >
              Contact by Email
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showDirectLink && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mt-6 max-w-3xl w-full rounded-2xl border border-primary/20 bg-primary-soft/10 backdrop-blur-md p-4 md:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">Founder Tip</p>
                  <p className="mt-1 text-xs text-site-muted leading-relaxed">
                    Prefer to use the original Google Form?{' '}
                    <button
                      type="button"
                      onClick={dismissFounderTip}
                      className="inline-flex items-center gap-0.5 font-semibold text-primary hover:text-primary-hover underline underline-offset-2"
                    >
                      Dismiss tip
                      <ChevronDown className="h-3 w-3 rotate-180" />
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
