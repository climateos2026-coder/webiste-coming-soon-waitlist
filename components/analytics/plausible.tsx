'use client';

import { useEffect } from 'react';

function isHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function PlausibleAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
      return;
    }

    const scriptUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_URL || 'https://plausible.io/js/script.js';
    if (!isHttpsUrl(scriptUrl)) {
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
    script.src = scriptUrl;
    if (scriptUrl === 'https://plausible.io/js/script.js') {
      script.integrity = 'sha384-zT1ce5bjM8JKtp1jP2OrIdAJbEUfNIUJ9FxzvMHDFBHmIU+cHYwXVs1xBoRORibS';
    }
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
