import type { Metadata } from 'next';
import RecruitmentClient from './RecruitmentClient';

export const metadata: Metadata = {
  title: "Recruitment — ClimateOS 2026",
  description: "Join the organizing team for ClimateOS 2026. Explore core team and volunteering roles to build the global online climate tech hackathon.",
  alternates: {
    canonical: '/recruitment',
  },
  openGraph: {
    title: "Recruitment — ClimateOS 2026",
    description: "Join the organizing team for ClimateOS 2026. Explore core team and volunteering roles to build the global online climate tech hackathon.",
  },
  twitter: {
    title: "Recruitment — ClimateOS 2026",
    description: "Join the organizing team for ClimateOS 2026. Explore core team and volunteering roles to build the global online climate tech hackathon.",
  },
};

export default function RecruitmentPage() {
  return <RecruitmentClient />;
}