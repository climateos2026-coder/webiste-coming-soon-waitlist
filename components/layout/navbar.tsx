'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
  { href: '/tracks', label: 'Tracks' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/recruitment', label: 'Recruitment' },
  { href: '/faq', label: 'FAQ' },
  { href: '/sponsors', label: 'Sponsors' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 border-b
        ${scrolled 
          ? 'border-site-border bg-site-card/85 backdrop-blur-xl shadow-sm' 
          : 'border-transparent bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg text-cyan-600 dark:text-cyan-200 tracking-tight hover:opacity-85 transition-all">
          ◈ ClimateOS 2026
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-site-muted hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-site-text hover:bg-site-card-elevated hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/tracks"
            className="hidden sm:inline-flex items-center h-10 px-5 rounded-xl 
                       bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 
                       text-slate-950 text-sm font-bold shadow-[0_4px_14px_rgba(6,182,212,0.15)]
                       transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Tracks →
          </Link>

          <button
            className="md:hidden p-2 rounded-xl text-site-text hover:bg-site-card-elevated transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 bg-site-bg z-40 flex flex-col p-6 gap-6 transition-colors duration-300">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display font-bold text-3xl text-site-text hover:text-cyan-600 dark:hover:text-cyan-200 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tracks"
            className="mt-4 inline-flex items-center justify-center h-14 px-8 
                       rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold text-lg shadow-md"
            onClick={() => setOpen(false)}
          >
            Explore Tracks →
          </Link>
        </div>
      )}
    </header>
  );
}