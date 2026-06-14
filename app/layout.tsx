import type { Metadata } from "next";
import { Instrument_Sans, Barlow_Condensed, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { PlausibleAnalytics } from '@/components/analytics/plausible';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow-condensed',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

// Fallback to canonical production URL for metadata Base to avoid typo preview deployment leaks
const CANONICAL_URL = 'https://climateos2026.vercel.app';

export const metadata: Metadata = {
  title: {
    default: "ClimateOS 2026 — Global Climate Tech Hackathon",
    template: "%s | ClimateOS 2026",
  },
  description: "48 hours. Up to 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
  metadataBase: new URL(CANONICAL_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "ClimateOS 2026",
    description: "48 hours. Up to 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
    url: CANONICAL_URL,
    siteName: "ClimateOS 2026",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClimateOS 2026",
    description: "48 hours. Up to 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
    creator: "@ClimateOSHack",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "ClimateOS 2026 Hackathon",
    "startDate": "2026-10-10T00:00:00Z",
    "endDate": "2026-10-12T23:59:59Z",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": CANONICAL_URL
    },
    "image": [
      `${CANONICAL_URL}/og-default.png`
    ],
    "description": "48 hours. Up to 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
    "organizer": {
      "@type": "Organization",
      "name": "ClimateOS",
      "url": CANONICAL_URL
    }
  };

  return (
    <html lang="en" className={`h-full ${instrumentSans.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`} data-theme="dark">
      <head>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:'dark');}catch(e){}})();`
          }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-body)' }}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md">
          Skip to content
        </a>
        <PlausibleAnalytics />
        <noscript>
          <div style={{ padding: '2rem', background: '#0F1720', color: '#F4F7FA', textAlign: 'center', fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ClimateOS 2026</h1>
            <p>JavaScript is required to view this site.</p>
            <p style={{ marginTop: '1rem' }}>
              <a href="https://forms.gle/y5aZGLeeGJhb94L28" style={{ color: '#F4643D', textDecoration: 'underline' }}>
                Join our waitlist on Google Forms
              </a>
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}