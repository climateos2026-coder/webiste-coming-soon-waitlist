'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    document.documentElement.setAttribute('data-theme', saved || 'dark');
    const animFrame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(animFrame);
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
        <Link href="/" className="flex-shrink-0 hover:opacity-85 transition-opacity">
          <Image
            src="/climateos-logo.webp"
            alt="ClimateOS 2026"
            width={175}
            height={28}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-site-muted hover:text-primary transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-site-text hover:bg-site-card-elevated hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/#waitlist"
            className="hidden sm:inline-flex items-center h-10 px-5 rounded-xl 
                       bg-gradient-to-r from-secondary to-primary hover:from-secondary-hover hover:to-primary-hover 
                       text-white text-sm font-bold shadow-[0_4px_14px_rgba(54,91,120,0.25)]
                       transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Join Waitlist
          </Link>

          <button
            className="md:hidden p-2 rounded-xl text-site-text hover:bg-site-card-elevated transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-16 bg-site-bg z-40 flex flex-col p-6 gap-6 transition-colors duration-300">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display font-bold text-3xl text-site-text hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            className="mt-4 inline-flex items-center justify-center h-14 px-8 
                       rounded-xl bg-gradient-to-r from-secondary to-primary hover:from-secondary-hover hover:to-primary-hover text-white font-bold text-lg shadow-md"
            onClick={() => setOpen(false)}
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </header>
  );
}