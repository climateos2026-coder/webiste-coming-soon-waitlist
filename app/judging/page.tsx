import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-site-bg pt-20 flex flex-col justify-between">
        <section className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-display text-4xl font-bold text-site-text mb-4">Coming Soon</h1>
            <p className="text-site-muted">This page is under construction. Join the waitlist to be notified when it goes live.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
