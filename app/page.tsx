import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ClimateComingSoon } from '@/components/coming-soon/climate-coming-soon';
import { WaitlistSection } from '@/components/sections/waitlist-section';

export default function Home() {
  return (
    <>
      <Navbar />
      <ClimateComingSoon />
      <WaitlistSection />
      <Footer />
    </>
  );
}