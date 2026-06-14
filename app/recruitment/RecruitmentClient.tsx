'use client';

import { useRef, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AuraBackground } from '@/components/layout/aura-background';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ClipboardList, ArrowRight, Sparkles, X } from 'lucide-react';
import { useFocusTrap } from '@/lib/hooks/use-focus-trap';

type Role = 'core' | 'volunteer';

const RECRUITMENT_LINKS: Record<Role, string> = {
  core: 'https://forms.gle/y5aZGLeeGJhb94L28',
  volunteer: 'https://forms.gle/BRSETWJzKd5ypPYQ8',
};

export default function RecruitmentClient() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  useFocusTrap(selectedRole !== null, modalRef, triggerButtonRef);

  const resetVerification = () => {
    setSelectedRole(null);
    setConsentChecked(false);
    setValidationError('');
    setFallbackUrl('');
    setSubmitting(false);
  };

  const handleSelectRole = (role: Role, buttonRef: HTMLButtonElement | null) => {
    triggerButtonRef.current = buttonRef;
    setConsentChecked(false);
    setValidationError('');
    setFallbackUrl('');
    setSelectedRole(role);
  };

  const handleVerifyAndRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setFallbackUrl('');

    if (!consentChecked) {
      consentRef.current?.focus();
      setValidationError('Please accept the privacy policy consent to proceed.');
      return;
    }

    setSubmitting(true);

    try {
      const targetUrl = selectedRole ? RECRUITMENT_LINKS[selectedRole] : '';
      if (!targetUrl) {
        throw new Error('Missing application link');
      }

      const opened = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (opened) {
        resetVerification();
      } else {
        setFallbackUrl(targetUrl);
        setValidationError('Popup was blocked. Use the direct application link below.');
      }
    } catch {
      setValidationError('Unable to open the application link. Use the direct link below.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-site-bg pt-20 transition-colors duration-300 relative flex flex-col justify-between">
        <AuraBackground variant="accent" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.1 }}
            className="rounded-3xl border border-site-border bg-site-card p-8 backdrop-blur md:p-12 shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-opacity group-hover:opacity-100" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-site-border-strong bg-site-card-elevated px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-bold text-primary transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary animate-spin" style={{ animationDuration: '6s' }} />
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
              <motion.button
                ref={triggerButtonRef}
                onClick={(event) => handleSelectRole('core', event.currentTarget)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', delay: 0.4 }}
                whileHover={{ scale: 1.01 }}
                className="w-full text-left rounded-2xl border border-site-border bg-site-card-elevated p-6 md:p-8 hover:border-primary/25 transition-all duration-300 shadow-sm block group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary group-hover:text-primary-hover font-bold transition-colors">
                    Core Team
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-site-text group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
                  Join the core team <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </h2>
                <p className="mt-3 text-sm text-site-muted leading-relaxed group-hover:text-site-text transition-colors duration-300">
                  Operations, execution, product, design, and event leadership roles. Take charge of key verticals.
                </p>
              </motion.button>

              <motion.button
                onClick={(event) => handleSelectRole('volunteer', event.currentTarget)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', delay: 0.45 }}
                whileHover={{ scale: 1.01 }}
                className="w-full text-left rounded-2xl border border-site-border bg-site-card-elevated p-6 md:p-8 hover:border-accent/25 transition-all duration-300 shadow-sm block group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-300 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-all duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-accent group-hover:text-accent-hover font-bold transition-colors">
                    Volunteering
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-site-text group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2">
                  Become a volunteer <ArrowRight className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </h2>
                <p className="mt-3 text-sm text-site-muted leading-relaxed group-hover:text-site-text transition-colors duration-300">
                  Help with Discord moderation, support desk, participant onboarding, and final evaluation logistics.
                </p>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-12 flex justify-start"
            >
              <Link
                href="/tracks"
                className="rounded-xl bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent px-6 py-3.5 text-sm font-bold text-[#102033] shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 hover:shadow-accent/10"
              >
                Explore track domains <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedRole && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={resetVerification}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-md rounded-2xl border border-site-border bg-site-card p-6 shadow-2xl backdrop-blur-xl text-left z-10 outline-none"
                onKeyDown={(event) => {
                  if (event.key === 'Escape') resetVerification();
                }}
              >
                <button
                  type="button"
                  onClick={resetVerification}
                  className="absolute right-4 top-4 p-1.5 rounded-lg text-site-muted hover:text-site-text hover:bg-site-card-elevated transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 id="modal-title" className="font-display font-bold text-lg text-site-text">
                    Consent before opening the application
                  </h3>
                </div>

                <p id="modal-description" className="text-sm text-site-muted mb-4 leading-relaxed">
                  Please confirm that you consent to the processing of your application details before opening the external form.
                </p>

                <form onSubmit={handleVerifyAndRedirect} className="space-y-4">
                  <label className="flex items-start gap-3 p-3 rounded-lg border border-site-border bg-site-card-elevated cursor-pointer select-none">
                    <input
                      ref={consentRef}
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-site-border text-primary focus:ring-primary focus:ring-offset-site-bg bg-site-bg cursor-pointer"
                    />
                    <span className="text-xs text-site-muted leading-relaxed">
                      I consent to the processing of my application details and agree to the{' '}
                      <Link href="/privacy" target="_blank" className="text-primary hover:underline font-semibold">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" target="_blank" className="text-primary hover:underline font-semibold">
                        Terms of Service
                      </Link>
                      .
                    </span>
                  </label>

                  {validationError && (
                    <p role="alert" className="text-xs text-red-500 font-semibold bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                      {validationError}
                    </p>
                  )}

                  {fallbackUrl && (
                    <a
                      href={fallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:border-primary/40"
                    >
                      Open application link <ArrowRight size={14} />
                    </a>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent px-4 py-3 text-sm font-bold text-[#102033] shadow-md transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {submitting ? 'Opening...' : 'Agree and Open Application Link'}
                    <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
