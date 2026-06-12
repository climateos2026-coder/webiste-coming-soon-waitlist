import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "Terms of Service — ClimateOS 2026",
  description: "Terms and conditions for participating in ClimateOS 2026. Review rules, expectations, and legal disclaimers.",
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-site-bg pt-20 transition-colors duration-300 relative flex flex-col justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,var(--glow-3),transparent_35%),radial-gradient(circle_at_80%_80%,var(--glow-1),transparent_35%)] pointer-events-none transition-colors duration-300" />
        
        <section className="relative mx-auto max-w-4xl w-full px-4 py-16 md:px-8 z-10">
          <div className="rounded-3xl border border-site-border bg-site-card p-8 md:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300">
            
            <div className="flex items-center gap-2 mb-6 text-primary">
              <FileText className="h-6 w-6" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Legal Agreement</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold text-site-text md:text-5xl tracking-tight transition-colors mb-4">
              Terms of Service
            </h1>
            <p className="text-xs text-site-muted-dark font-medium mb-8">
              Effective Date: June 4, 2026 · Last Updated: June 4, 2026
            </p>

            <div className="space-y-8 text-sm leading-relaxed text-site-muted">
              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">1. Agreement to Terms</h2>
                <p>
                  By joining the waitlist, applying to our recruitment verticals, or registering as a participant for ClimateOS 2026, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you should not submit details to our waitlist forms, apply for recruitment, or register for the event.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">2. Hackathon Eligibility & Code of Conduct</h2>
                <p className="mb-2">
                  ClimateOS is a global event welcoming builders of all skill levels. To maintain a safe, welcoming, and productive environment:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You must participate in good faith and respect all members of the organizing team, mentors, and fellow builders.</li>
                  <li>Harassment, spamming recruitment applications, and deploying malicious scripts to disrupt event operations are strictly prohibited.</li>
                  <li>We reserve the right to remove any participant or cancel applications that violate our official Code of Conduct or compromise event security.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">3. Submissions & Open Source</h2>
                <p>
                  All project submissions built during the 48-hour hackathon must be original work created within the sprint window. We strongly advocate for open-source development. By participating, you agree that your final submission materials (demo videos, codebase links, and summaries) may be indexed and published inside the ClimateOS Open Library for educational and climate action visibility.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">4. Limitation of Liability</h2>
                <p>
                  The ClimateOS organizing team is providing the platform, community channels, and resources on an &quot;as-is&quot; basis. Under no circumstances shall organizers, sponsors, or partners be held liable for any direct, indirect, incidental, or consequential damages resulting from your participation in the hackathon, scheduling interactions, or website access.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">5. Modifications to the Event & Terms</h2>
                <p>
                  We reserve the right to amend hackathon dates, track problem statements, scheduling criteria, and these Terms at our discretion. If changes occur, the updated versions will be posted immediately on this website. Continued use of the site or participation after revisions represents full agreement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-site-text mb-3">6. Governing Law</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with applicable rules, without regard to conflict of law principles. Any legal disputes arising under these terms shall be settled through amicable data coordination.
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
              <Link href="/privacy" className="text-xs text-primary hover:underline font-semibold">
                Read Privacy Policy →
              </Link>
            </div>

          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
