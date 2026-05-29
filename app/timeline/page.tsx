import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DetailComingSoon } from '@/components/coming-soon/detail-coming-soon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Timeline",
  description: "Event timeline for ClimateOS 2026. Key dates including pre-launch, the 48-hour build sprint, judging, and finals.",
  openGraph: {
    title: "ClimateOS 2026 Timeline",
    description: "Complete schedule for ClimateOS 2026: pre-launch preparation, 48-hour hackathon sprint, judging, and finals.",
  },
  twitter: {
    title: "ClimateOS 2026 Timeline",
    description: "Complete schedule for ClimateOS 2026: pre-launch preparation, 48-hour hackathon sprint, judging, and finals.",
  },
  robots: {
    index: false,
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
