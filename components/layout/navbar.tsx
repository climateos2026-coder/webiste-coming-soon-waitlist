'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
  { href: '/tracks', label: 'Tracks' },
  { href: '/recruitment', label: 'Recruitment' },
  { href: '/faq', label: 'FAQ' },
  { href: '/sponsors', label: 'Sponsors' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-150 
        ${scrolled ? 'border-b border-emerald-100/15 bg-[#02110f]/80 backdrop-blur-xl' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg text-emerald-300 tracking-tight hover:text-emerald-200 transition-colors">
          ◈ ClimateOS 2026
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-emerald-50/90 hover:text-emerald-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-emerald-50 hover:text-emerald-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/tracks"
            className="hidden sm:inline-flex items-center h-10 px-5 rounded-md 
                       bg-emerald-400 text-slate-900 text-sm font-semibold tracking-wide
                       hover:bg-emerald-300 transition-colors"
          >
            Explore Tracks →
          </Link>

          <button
            className="md:hidden p-2 text-emerald-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 bg-[#04110f] z-40 flex flex-col p-6 gap-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display font-bold text-3xl text-emerald-50 hover:text-emerald-300 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tracks"
            className="mt-4 inline-flex items-center justify-center h-14 px-8 
                       rounded-md bg-emerald-400 text-slate-900 font-semibold text-lg"
            onClick={() => setOpen(false)}
          >
            Explore Tracks →
          </Link>
        </div>
      )}
    </header>
  );
}