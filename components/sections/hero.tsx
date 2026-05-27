import Link from 'next/link';
import { CountdownTimer } from './countdown-timer';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-neutral-0 tracking-tight">
            48 Hours. 500 Builders. One Planet.
          </h1>
          <p className="font-body text-lg text-neutral-200 max-w-lg">
            ClimateOS 2026 is a global online hackathon where engineers, scientists, designers, and domain experts build deployed open-source tools for five urgent climate challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="inline-flex items-center h-12 px-8 rounded-md bg-amber-500 text-white font-semibold tracking-wide hover:bg-amber-400 transition-colors"
            >
              Join the Waitlist →
            </Link>
            <Link
              href="/tracks"
              className="inline-flex items-center h-12 px-8 rounded-md border border-teal-600 text-teal-400 hover:bg-teal-900/20 transition-colors"
            >
              Explore Tracks
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}