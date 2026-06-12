'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ClipboardList, ArrowRight, Sparkles, ShieldCheck, X } from 'lucide-react';

export default function RecruitmentClient() {
  const [selectedRole, setSelectedRole] = useState<'core' | 'volunteer' | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, result: 0 });
  const [validationError, setValidationError] = useState('');

  const handleSelectRole = (role: 'core' | 'volunteer') => {
    const num1 = Math.floor(Math.random() * 8) + 2; // 2-9
    const num2 = Math.floor(Math.random() * 8) + 2; // 2-9
    setMathProblem({ num1, num2, result: num1 + num2 });
    setMathAnswer('');
    setConsentChecked(false);
    setValidationError('');
    setSelectedRole(role);
  };

  useEffect(() => {
    if (!selectedRole) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedRole(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedRole]);

  const handleVerifyAndRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setValidationError('Please accept the privacy policy consent to proceed.');
      return;
    }
    const parsedAnswer = parseInt(mathAnswer.trim(), 10);
    if (isNaN(parsedAnswer) || parsedAnswer !== mathProblem.result) {
      setValidationError('Incorrect verification answer. Please try again.');
      return;
    }

    // Success! Redirect to appropriate link
    const targetUrl =
      selectedRole === 'core'
        ? 'https://forms.gle/y5aZGLeeGJhb94L28'
        : 'https://forms.gle/BRSETWJzKd5ypPYQ8';
    
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setSelectedRole(null); // Close modal
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-site-bg pt-20 transition-colors duration-300 relative flex flex-col justify-between">
        <section className="relative overflow-hidden flex-grow flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,var(--glow-3),transparent_35%),radial-gradient(circle_at_80%_15%,var(--glow-1),transparent_35%)] transition-colors duration-300" />
          
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
                  onClick={() => handleSelectRole('core')}
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
                  onClick={() => handleSelectRole('volunteer')}
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
                  className="rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 hover:shadow-primary/10"
                >
                  Explore track domains <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Verification & Consent Dialog */}
        <AnimatePresence>
          {selectedRole && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedRole(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-md rounded-2xl border border-site-border bg-site-card p-6 shadow-2xl backdrop-blur-xl text-left z-10"
              >
                <button
                  onClick={() => setSelectedRole(null)}
                  className="absolute right-4 top-4 p-1.5 rounded-lg text-site-muted hover:text-site-text hover:bg-site-card-elevated transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 id="modal-title" className="font-display font-bold text-lg text-site-text">
                    Consent & Security Verification
                  </h3>
                </div>

                <p className="text-sm text-site-muted mb-4 leading-relaxed">
                  To protect our recruitment pipelines and comply with GDPR, India&apos;s DPDP Act, and CCPA regulations, please confirm your consent and verify you are human before opening the form.
                </p>

                <form onSubmit={handleVerifyAndRedirect} className="space-y-4">
                  {/* Privacy Consent Checkbox */}
                  <label className="flex items-start gap-3 p-3 rounded-lg border border-site-border bg-site-card-elevated cursor-pointer select-none">
                    <input
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

                  {/* Anti-spam Math Challenge */}
                  <div className="p-3 rounded-lg border border-site-border bg-site-card-elevated space-y-2">
                    <label className="block text-xs font-semibold text-site-muted uppercase tracking-wider">
                      Human Check: Solve to unlock link
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-site-text select-none">
                        {mathProblem.num1} + {mathProblem.num2} =
                      </span>
                      <input
                        type="text"
                        value={mathAnswer}
                        onChange={(e) => setMathAnswer(e.target.value)}
                        placeholder="?"
                        required
                        className="w-16 rounded-lg border border-site-border bg-site-bg px-3 py-1.5 text-center text-sm text-site-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>

                  {validationError && (
                    <p className="text-xs text-red-500 font-semibold bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                      {validationError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01]"
                  >
                    Agree and Open Application Link
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
