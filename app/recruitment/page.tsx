import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function RecruitmentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#04110f] pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(52,211,153,0.16),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,0.12),transparent_30%)]" />
          <div className="relative mx-auto max-w-5xl px-4 py-24">
            <div className="rounded-3xl border border-emerald-100/20 bg-[#071613]/80 p-8 backdrop-blur md:p-12">
              <span className="inline-flex rounded-full border border-emerald-200/25 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-100">
                Recruitment now open
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold text-emerald-50 md:text-5xl">
                Join the ClimateOS 2026 team
              </h1>
              <p className="mt-4 max-w-3xl text-emerald-50/75">
                We are hiring both core team members and volunteers to help run a world-class online
                climate-tech hackathon.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <a
                  href="https://forms.gle/y5aZGLeeGJhb94L28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-emerald-100/25 bg-emerald-300/10 p-6 transition hover:-translate-y-1 hover:bg-emerald-300/15"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">Core Team</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-emerald-50">Join the core team</h2>
                  <p className="mt-2 text-sm text-emerald-50/75">Operations, execution, product, and event leadership roles.</p>
                </a>
                <a
                  href="https://forms.gle/BRSETWJzKd5ypPYQ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-cyan-100/20 bg-cyan-300/10 p-6 transition hover:-translate-y-1 hover:bg-cyan-300/15"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Volunteering</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-cyan-50">Become a volunteer</h2>
                  <p className="mt-2 text-sm text-cyan-50/75">Help with support, moderation, and event facilitation.</p>
                </a>
              </div>
              <div className="mt-8">
                <Link
                  href="/tracks"
                  className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
                >
                  Explore track domains
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
