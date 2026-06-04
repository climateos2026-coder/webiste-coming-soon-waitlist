import type { Metadata } from 'next';
import TracksClient from './TracksClient';

export const metadata: Metadata = {
  title: "Tracks — ClimateOS 2026",
  description: "Learn about the five core domains, curated data packages, and real-world deployment challenges of ClimateOS 2026 climate tech hackathon.",
  alternates: {
    canonical: '/tracks',
  },
  openGraph: {
    title: "Tracks — ClimateOS 2026",
    description: "Learn about the five core domains, curated data packages, and real-world deployment challenges of ClimateOS 2026 climate tech hackathon.",
  },
  twitter: {
    title: "Tracks — ClimateOS 2026",
    description: "Learn about the five core domains, curated data packages, and real-world deployment challenges of ClimateOS 2026 climate tech hackathon.",
  },
};

export default function TracksPage() {
  return <TracksClient />;
}