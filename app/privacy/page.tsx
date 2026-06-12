import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "Privacy Policy — ClimateOS 2026",
  description: "Privacy policy and data protection guidelines for ClimateOS 2026. Learn how we handle waitlist, recruitment, and participant data.",
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-site-bg pt-20 transition-colors duration-300 relative flex flex-col justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,var(--glow-3),transparent_35%),radial-gradient(circle_at_80%_80%,var(--glow-1),transparent_35%)] pointer-events-none transition-colors duration-300" />
        
        <section className="relative mx-auto max-w-4xl w-full px-4 py-16 md:px-8 z-10">
          <div className="rounded-3xl border border-site-border bg-site-card p-8 md:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300">
            
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Shield className="h-6 w-6" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Privacy Center</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold text-site-text md:text-5xl tracking-tight transition-colors mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-site-muted-dark font-medium mb-8">
              Effective Date: June 4, 2026 · Last Updated: June 4, 2026
            </p>

            <div className="space-y-8 text-sm leading-relaxed text-site-muted">
              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">1. Introduction</h2>
                <p>
                  ClimateOS 2026 (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) organizes the global, online climate tech hackathon. We are committed to protecting the privacy of our waitlist registrants, core team and volunteer applicants, and participants. This Privacy Policy describes how we collect, use, and safeguard personal information in compliance with international data protection frameworks, including the European Union&apos;s General Data Protection Regulation (GDPR), India&apos;s Digital Personal Data Protection (DPDP) Act 2023, and the California Consumer Privacy Act (CCPA).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">2. Data We Collect</h2>
                <p className="mb-2">We collect information that you explicitly choose to provide to us when using our services:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Waitlist Information:</strong> Email address, name, role/background, country of residence, track interests, and referral sources. This data is collected via embedded Google Forms and stored in our secure database.</li>
                  <li><strong>Recruitment Data:</strong> Full name, contact details, LinkedIn/GitHub profiles, resume information, scheduling availability, and motivation statements when applying for Core Team or Volunteering roles.</li>
                  <li><strong>Technical Logs:</strong> Anonymous telemetry, browser agent types, and page interaction metrics collected via privacy-first analytics tools.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">3. How We Collect & Store Data</h2>
                <p>
                  Data collection for our waitlist and recruitment is facilitated primarily through Google Forms and stored securely. In addition, user registration details and waitlist records are persisted inside our database infrastructure powered by Supabase. We do not use intrusive third-party cookies or sell your personal data to advertisers.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">4. Purpose of Processing</h2>
                <p className="mb-2">Your data is processed strictly for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sending event updates, reminders, and application opening alerts.</li>
                  <li>Reviewing and processing team applications and volunteer recruitment queries.</li>
                  <li>Optimizing site quality and monitoring security features against automated bot attacks.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">5. International Compliances & Your Rights</h2>
                <p className="mb-3">
                  Under the GDPR (Europe), DPDP Act (India), and CCPA (United States), you have specific statutory rights concerning your personal data:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Right to Access & Portability:</strong> You can request a copy of all personal information we hold about you.</li>
                  <li><strong>Right to Rectification:</strong> You can request that we correct inaccurate or incomplete data.</li>
                  <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You have the right to request that we delete your email, waitlist status, or application details from our files.</li>
                  <li><strong>Right to Withdraw Consent:</strong> You can opt-out of updates or withdraw recruitment requests at any time.</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, please email us directly at <a href="mailto:climateos26@gmail.com" className="text-primary hover:underline font-semibold">climateos26@gmail.com</a>. We will process and confirm your request within 72 hours.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">6. Contact Information</h2>
                <p>
                  For any privacy inquiries, data deletion requests, or questions regarding our security protocols, please contact our data coordination team at <a href="mailto:climateos26@gmail.com" className="text-primary hover:underline font-semibold">climateos26@gmail.com</a>.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-site-border flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-site-border bg-site-card hover:bg-site-card-elevated px-5 py-2.5 text-xs font-semibold text-site-text transition-all hover:scale-[1.02]"
              >
                <ArrowLeft size={14} />
                Back to Home
              </Link>
              <Link href="/terms" className="text-xs text-primary hover:underline font-semibold">
                View Terms of Service →
              </Link>
            </div>

          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
