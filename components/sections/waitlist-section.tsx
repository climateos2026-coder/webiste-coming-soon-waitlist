'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Info, Loader2 } from 'lucide-react';

const FOUNDER_TIP_KEY = 'climateos_waitlist_founder_tip_dismissed';
const REGISTRATION_FORM_URL = process.env.NEXT_PUBLIC_REGISTRATION_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSe-KdYY0OvG7T7hMmJ814H_Ut6_IT-T1f2lTlqYEuZe-zT63Q/viewform?embedded=true';
const DIRECT_FORM_URL = process.env.NEXT_PUBLIC_REGISTRATION_FORM_URL || 'https://forms.gle/4derjc3mE76gHZaq5';

export function WaitlistSection() {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showDirectLink, setShowDirectLink] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(FOUNDER_TIP_KEY);
    if (!dismissed) {
      const tipTimer = setTimeout(() => setShowDirectLink(true), 3000);
      return () => clearTimeout(tipTimer);
    }
  }, []);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIframeLoading(false);
      setShowDirectLink(true);
    }, 15000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const dismissFounderTip = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FOUNDER_TIP_KEY, 'true');
    }
    setShowDirectLink(false);
  }, []);

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
          <div className="relative min-h-[720px] w-full bg-site-card-elevated/40 flex flex-col">
            <AnimatePresence mode="wait">
              {iframeLoading && (
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
            </AnimatePresence>

            <iframe
              src={REGISTRATION_FORM_URL}
              width="100%"
              height="720"
              className="border-0 w-full z-10 bg-transparent rounded-t-3xl"
              onLoad={() => setIframeLoading(false)}
              title="ClimateOS 2026 Registration Waitlist"
            >
              Loading…
            </iframe>
          </div>

          {showDirectLink && (
            <div className="border-t border-site-border px-6 py-4 bg-site-card-elevated/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-xs text-site-muted-dark">
                Having trouble loading the form? Open it directly in a new tab.
              </span>
              <a
                href={DIRECT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-site-border bg-site-card hover:bg-site-card-elevated px-3 py-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-all hover:scale-[1.02]"
              >
                Open Registration Form
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

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
                  <p className="text-sm font-semibold text-primary">Registration fallback</p>
                  <p className="mt-1 text-xs text-site-muted leading-relaxed">
                    If a privacy extension, firewall, or browser setting blocks the embedded form, use the direct link:{' '}
                    <a
                      href={DIRECT_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 font-semibold text-primary hover:text-primary-hover underline underline-offset-2 mr-2"
                    >
                      Open in new tab
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {' • '}
                    <button
                      type="button"
                      onClick={dismissFounderTip}
                      className="inline-flex items-center gap-0.5 font-semibold text-site-muted-dark hover:text-site-text underline underline-offset-2 ml-2"
                    >
                      Dismiss tip
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
