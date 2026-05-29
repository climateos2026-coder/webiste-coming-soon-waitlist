'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Loader2, Terminal, ShieldAlert } from 'lucide-react';

export function WaitlistSection() {
  const [iframeLoading, setIframeLoading] = useState(true);
  const formUrl = 'https://forms.gle/BE377GYgunCKDSzm8?embedded=true';
  const directUrl = 'https://forms.gle/BE377GYgunCKDSzm8';

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 pb-28 pt-10 md:px-8 z-10">
      {/* Subtle background glow specific to this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="flex flex-col items-center">
        {/* Animated Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mb-12 space-y-4"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-site-border bg-site-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Waitlist Now Live
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Secure your{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              early entry
            </span>
          </h2>
          <p className="text-site-muted text-base md:text-lg">
            Join the elite network of climate builders, engineers, and researchers.
            Applications open July 2026. Register early to claim your priority track assignment.
          </p>
        </motion.div>

        {/* Cyberpunk Gateway Terminal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-3xl rounded-3xl border border-site-border bg-site-card/50 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-site-border-strong"
        >
          {/* Neon border accents */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/10 via-primary to-accent/30" />
          
          {/* Decorative Terminal Header */}
          <div className="flex items-center justify-between border-b border-site-border px-6 py-4 bg-site-card-elevated/40">
            <div className="flex items-center gap-3">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs font-semibold tracking-wider text-site-muted uppercase">
                ◈ CLIMATEOS_ENTRY_GATEWAY_v2.0
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-primary font-bold">
                ENCRYPTED_CHANNEL
              </span>
            </div>
          </div>

          {/* Interactive Form Display Container */}
          <div className="relative min-h-[640px] w-full bg-white/5 flex flex-col items-center justify-center">
            
            {/* Elegant Telemetry Loading Overlay */}
            <AnimatePresence>
              {iframeLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-site-bg/95 p-6 text-center"
                >
                  <div className="relative flex items-center justify-center mb-6">
                    {/* Pulsing ring outer */}
                    <div className="absolute h-16 w-16 rounded-full border border-primary/20 animate-ping" />
                    {/* Rotating dashboard ring */}
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  </div>
                  <p className="font-display text-lg font-bold text-site-text tracking-wide">
                    Establishing Gateway Connection
                  </p>
                  <p className="mt-1 font-mono text-xs text-primary/70 tracking-widest uppercase">
                    Initializing Telemetry Form...
                  </p>
                  <div className="mt-4 flex gap-1 w-24 h-[2px] bg-site-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="relative w-full h-full bg-primary"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Embedded Google Form Iframe */}
            <iframe
              src={formUrl}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              width="100%"
              height="800"
              className="relative z-10 w-full border-0 block"
              title="ClimateOS 2026 Waitlist Form"
              onLoad={() => setIframeLoading(false)}
            >
              Loading Waitlist Form…
            </iframe>
          </div>

          {/* Terminal Footer with Troubleshooting Support */}
          <div className="border-t border-site-border px-6 py-4 bg-site-card-elevated/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="font-mono text-[10px] text-site-muted-dark tracking-wide flex items-center gap-1.5">
              <ShieldAlert className="h-3 w-3 text-accent" />
              Third-party cookies or tracker blockers might affect frame rendering.
            </span>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-site-border bg-site-card hover:bg-site-card-elevated px-3 py-1.5 text-xs font-semibold text-primary hover:text-primary-hover hover:border-primary/20 transition-all hover:scale-[1.02]"
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
