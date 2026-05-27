import Link from 'next/link';

const FOOTER_LINKS = {
  primary: [
    { href: '/', label: 'Home' },
    { href: '/tracks', label: 'Tracks' },
    { href: '/faq', label: 'FAQ' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/recruitment', label: 'Recruitment' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#070b18] border-t border-slate-100/10 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="font-display font-bold text-xl text-cyan-200 tracking-tight">
              ◈ ClimateOS 2026
            </Link>
            <p className="text-slate-200/80 text-sm mt-3">
              Global online climate-tech hackathon
            </p>
            <p className="text-slate-300/60 text-xs mt-2">
              October 10–12, 2026 · Online · Free
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-slate-100 mb-4">Explore</h3>
            <ul className="grid grid-cols-2 gap-2">
              {FOOTER_LINKS.primary.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300/85 hover:text-cyan-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-slate-100 mb-4">Contact</h3>
            <p className="text-sm text-slate-300/85">climateos26@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-slate-100/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-300/60">
            © 2026 ClimateOS. All rights reserved.
          </p>
          <Link href="/faq" className="text-xs text-slate-300/60 hover:text-cyan-200 transition-colors">
            Questions and updates
          </Link>
        </div>
      </div>
    </footer>
  );
}