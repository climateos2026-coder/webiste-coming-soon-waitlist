import Link from 'next/link';

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
            <Link href="/" className="font-display font-bold text-xl text-cyan-600 dark:text-cyan-200 tracking-tight hover:opacity-85 transition-opacity">
              ◈ ClimateOS 2026
            </Link>
            <p className="text-site-muted text-sm mt-3 transition-colors duration-300">
              Global online climate-tech hackathon
            </p>
            <p className="text-site-muted-dark text-xs mt-2 transition-colors duration-300">
              October 10–12, 2026 · Online · Free
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-site-text mb-4 transition-colors duration-300">Explore</h3>
            <ul className="grid grid-cols-2 gap-2">
              {FOOTER_LINKS.primary.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-site-muted hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-site-text mb-4 transition-colors duration-300">Contact</h3>
            <p className="text-sm text-site-muted transition-colors duration-300">climateos26@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-site-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-site-muted-dark transition-colors duration-300">
            © 2026 ClimateOS. All rights reserved.
          </p>
          <Link href="/faq" className="text-xs text-site-muted-dark hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors">
            Questions and updates
          </Link>
        </div>
      </div>
    </footer>
  );
}