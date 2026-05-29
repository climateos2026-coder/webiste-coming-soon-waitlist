import type { Metadata } from "next";
import "./globals.css";
import { PlausibleAnalytics } from '@/components/analytics/plausible';

const VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'climateos2026.vercel.app';
const SITE_URL = VERCEL_URL.startsWith('http') ? VERCEL_URL : `https://${VERCEL_URL}`;

export const metadata: Metadata = {
  title: {
    default: "ClimateOS 2026 — Global Climate Tech Hackathon",
    template: "%s | ClimateOS 2026",
  },
  description: "48 hours. 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "ClimateOS 2026",
    description: "48 hours. 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
    url: SITE_URL,
    siteName: "ClimateOS 2026",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClimateOS 2026",
    description: "48 hours. 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
    creator: "@ClimateOSHack",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-theme="dark">
      <head>
        {/* Runs synchronously before paint — prevents theme flash */}
        <script src="/theme-init.js" />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-body)' }}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md">
          Skip to content
        </a>
        <PlausibleAnalytics />
        {children}
      </body>
    </html>
  );
}