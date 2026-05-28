import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DetailComingSoon } from '@/components/coming-soon/detail-coming-soon';

export default function SponsorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050712] pt-16">
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