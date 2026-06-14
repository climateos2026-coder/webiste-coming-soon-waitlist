import Link from 'next/link';
import Image from 'next/image';

const FOOTER_LINKS = {
  primary: [
    { href: '/', label: 'Home' },
    { href: '/tracks', label: 'Tracks' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/faq', label: 'FAQ' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/recruitment', label: 'Recruitment' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-site-card border-t border-site-border py-10 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-block hover:opacity-85 transition-opacity">
              <Image
                src="/climateos-logo.webp"
                alt="ClimateOS 2026"
                width={200}
                height={32}
              />
            </Link>
            <p className="text-site-muted text-sm mt-3 transition-colors duration-300">
              Global online climate-tech hackathon
            </p>
            <p className="text-site-muted-dark text-xs mt-2 transition-colors duration-300">
              Online · Free
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-site-text mb-4 transition-colors duration-300">Explore</h3>
            <ul className="grid grid-cols-2 gap-2">
              {FOOTER_LINKS.primary.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-site-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-site-text mb-4 transition-colors duration-300">Contact</h3>
            <a href="mailto:climateos26@gmail.com" className="text-sm text-site-muted hover:text-primary transition-colors duration-300">climateos26@gmail.com</a>
          </div>
        </div>

        <div className="border-t border-site-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-site-muted-dark">
            <span>© 2026 ClimateOS. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
          <Link href="/faq" className="text-xs text-site-muted-dark hover:text-primary transition-colors">
            Questions and updates
          </Link>
        </div>
      </div>
    </footer>
  );
}