import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DetailComingSoon } from '@/components/coming-soon/detail-coming-soon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Partner with ClimateOS 2026. Sponsor packages for organizations supporting open-source climate tech solutions.",
  openGraph: {
    title: "ClimateOS 2026 Sponsors",
    description: "Partner with ClimateOS 2026 to support open-source climate solutions built by 500 global builders.",
  },
  twitter: {
    title: "ClimateOS 2026 Sponsors",
    description: "Partner with ClimateOS 2026 to support open-source climate solutions built by 500 global builders.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SponsorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-site-bg pt-16 transition-colors duration-300">
        <DetailComingSoon
          badge="Sponsors coming soon"
          title="Sponsorship page is being prepared"
          description="We are curating sponsor tiers, partnership outcomes, and onboarding details. The full sponsor portal will be published soon."
          primaryHref="/faq"
          primaryLabel="Read event details"
          secondaryHref="/timeline"
          secondaryLabel="View timeline"
        />
      </main>
      <Footer />
    </>
  );
}