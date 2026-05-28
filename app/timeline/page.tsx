import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DetailComingSoon } from '@/components/coming-soon/detail-coming-soon';

export default function TimelinePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-site-bg pt-16 transition-colors duration-300">
        <DetailComingSoon
          badge="Event timeline coming soon"
          title="ClimateOS event timeline is on the way"
          description="A complete timeline for pre-launch, sprint, judging, and finals will be released shortly with timezone-friendly scheduling."
          primaryHref="/faq"
          primaryLabel="See current FAQ"
          secondaryHref="/tracks"
          secondaryLabel="Explore tracks"
        />
      </main>
      <Footer />
    </>
  );
}
