import type { Metadata } from "next";
import "./globals.css";
import { PlausibleAnalytics } from '@/components/analytics/plausible';

export const metadata: Metadata = {
  title: "ClimateOS 2026 — Global Climate Tech Hackathon",
  description: "48 hours. 500 builders. One planet. Join the global online hackathon building open-source climate tech — October 10-12, 2026.",
  metadataBase: new URL('https://climateoshack.dev'),
  openGraph: {
    title: "ClimateOS 2026",
    description: "48 hours. 500 builders. One planet.",
    url: "https://climateoshack.dev",
    siteName: "ClimateOS 2026",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClimateOS 2026",
    description: "48 hours. 500 builders. One planet.",
    creator: "@ClimateOSHack",
  },
};

// Inline script that runs before hydration to prevent theme flash
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-theme="dark">
      <head>
        {/* Runs synchronously before paint — prevents theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-body)' }}>
        <PlausibleAnalytics />
        {children}
      </body>
    </html>
  );
}