import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: "FAQ — ClimateOS 2026",
  description: "Frequently asked questions about ClimateOS 2026. Answers regarding tracks, timeline, eligibility, formatting, and submission rules.",
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: "FAQ — ClimateOS 2026",
    description: "Frequently asked questions about ClimateOS 2026. Answers regarding tracks, timeline, eligibility, formatting, and submission rules.",
  },
  twitter: {
    title: "FAQ — ClimateOS 2026",
    description: "Frequently asked questions about ClimateOS 2026. Answers regarding tracks, timeline, eligibility, formatting, and submission rules.",
  },
};

export default function FAQPage() {
  return <FAQClient />;
}