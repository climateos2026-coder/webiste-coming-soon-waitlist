import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AuraBackground } from '@/components/layout/aura-background';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-site-bg pt-20 transition-colors duration-300 relative flex flex-col justify-between">
        <AuraBackground variant="primary" />
        
        <section className="relative flex-grow flex items-center justify-center mx-auto max-w-xl w-full px-4 py-16 z-10">
          <div className="w-full rounded-3xl border border-site-border bg-site-card p-8 md:p-12 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-primary/20">
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
            
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-site-card border border-site-border mb-6 shadow-inner relative">
              <Compass className="h-10 w-10 text-primary animate-spin" style={{ animationDuration: '10s' }} />
            </div>

            <h1 className="font-display text-4xl font-extrabold text-site-text tracking-tight mb-4">
              404 — Lost in Orbit
            </h1>

            <p className="text-site-muted text-sm md:text-base mb-8 leading-relaxed">
              The page you are looking for has either drifted away or never existed in this climate system. Let&apos;s get you back on track.
            </p>

            <div className="flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent px-6 py-3 text-sm font-bold text-[#102033] shadow-md transition-all hover:scale-[1.02]"
              >
                <ArrowLeft size={16} />
                Return to Mission Control
              </Link>
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
