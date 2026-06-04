import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ClimateComingSoon } from '@/components/coming-soon/climate-coming-soon';
import { WaitlistSection } from '@/components/sections/waitlist-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ClimateOS 2026 — Global Climate Tech Hackathon",
  description: "ClimateOS 2026 is a global, fully-online climate tech hackathon. Join up to 500 builders October 10-12, 2026 to create deployable open-source solutions for urgent climate challenges.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ClimateOS 2026 — Global Climate Tech Hackathon",
    description: "ClimateOS 2026 is a global, fully-online climate tech hackathon. Join up to 500 builders October 10-12, 2026 to create deployable open-source solutions for urgent climate challenges.",
  },
  twitter: {
    title: "ClimateOS 2026 — Global Climate Tech Hackathon",
    description: "ClimateOS 2026 is a global, fully-online climate tech hackathon. Join up to 500 builders October 10-12, 2026 to create deployable open-source solutions for urgent climate challenges.",
  },
};

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