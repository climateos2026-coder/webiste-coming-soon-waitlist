import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DetailComingSoon } from '@/components/coming-soon/detail-coming-soon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Timeline — ClimateOS 2026",
  description: "Complete event timeline for ClimateOS 2026. Check out key dates, pre-launch preparations, the 48-hour climate build sprint, and finals schedule.",
  alternates: {
    canonical: '/timeline',
  },
  openGraph: {
    title: "Timeline — ClimateOS 2026",
    description: "Complete event timeline for ClimateOS 2026. Check out key dates, pre-launch preparations, the 48-hour climate build sprint, and finals schedule.",
  },
  twitter: {
    title: "Timeline — ClimateOS 2026",
    description: "Complete event timeline for ClimateOS 2026. Check out key dates, pre-launch preparations, the 48-hour climate build sprint, and finals schedule.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
