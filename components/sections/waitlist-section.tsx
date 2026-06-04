'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';

export function WaitlistSection() {
  const [iframeLoading, setIframeLoading] = useState(true);
  const formUrl = 'https://forms.gle/BE377GYgunCKDSzm8?embedded=true';
  const directUrl = 'https://forms.gle/BE377GYgunCKDSzm8';

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

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-3xl rounded-3xl border border-site-border bg-site-card/50 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-site-border-strong"
        >
          <div className="relative min-h-[640px] w-full bg-white/5 flex flex-col items-center justify-center">
            
            <AnimatePresence>
              {iframeLoading && (
                <motion.div
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
              src={formUrl}
              width="100%"
              height="800"
              className="relative z-10 w-full border-0 block"
              title="ClimateOS 2026 Waitlist Form"
              sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              onLoad={() => setIframeLoading(false)}
            >
              Loading Waitlist Form…
            </iframe>
          </div>

          <div className="border-t border-site-border px-6 py-4 bg-site-card-elevated/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="text-xs text-site-muted-dark">
              Having trouble loading? Open the form directly below.
            </span>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-site-border bg-site-card hover:bg-site-card-elevated px-3 py-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-all hover:scale-[1.02]"
            >
              Open Direct Form
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
