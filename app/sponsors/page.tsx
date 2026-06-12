import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DetailComingSoon } from '@/components/coming-soon/detail-coming-soon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sponsors — ClimateOS 2026",
  description: "Partner with ClimateOS 2026. Explore sponsor packages for organizations supporting open-source climate tech solutions built by up to 500 global builders.",
  alternates: {
    canonical: '/sponsors',
  },
  openGraph: {
    title: "Sponsors — ClimateOS 2026",
    description: "Partner with ClimateOS 2026. Explore sponsor packages for organizations supporting open-source climate tech solutions built by up to 500 global builders.",
  },
  twitter: {
    title: "Sponsors — ClimateOS 2026",
    description: "Partner with ClimateOS 2026. Explore sponsor packages for organizations supporting open-source climate tech solutions built by up to 500 global builders.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SponsorsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-site-bg pt-16 transition-colors duration-300">
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