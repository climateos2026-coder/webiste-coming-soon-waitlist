import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseHostname: string = "";
if (supabaseUrl) {
  try {
    supabaseHostname = new URL(supabaseUrl).hostname;
  } catch {
    supabaseHostname = "";
  }
}

const isDev = process.env.NODE_ENV !== 'production';

const supabaseConnect = supabaseHostname ? `https://${supabaseHostname}` : "";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://plausible.io;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.brevo.com https://plausible.io ${supabaseConnect};
  frame-src 'self' https://docs.google.com https://forms.gle;
  frame-ancestors 'none';
`.replace(/\s{2,}/g, ' ').trim();

const remotePatterns = [
  {
    protocol: 'https' as const,
    hostname: 'climateos2026.vercel.app',
  },
];

if (supabaseHostname) {
  remotePatterns.push({
    protocol: 'https' as const,
    hostname: supabaseHostname,
  });
}

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;