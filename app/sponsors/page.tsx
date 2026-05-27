import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function SponsorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050712] pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(192,132,252,0.14),transparent_30%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-8">
            <div className="rounded-3xl border border-slate-100/15 bg-[#0b1022]/80 p-8 backdrop-blur md:p-12">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/75">Partners and Sponsorship</p>
              <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">Sponsor ClimateOS 2026</h1>
              <p className="mt-4 max-w-3xl text-slate-200/80">
                Partner with ClimateOS to support global builders creating deployable climate solutions across energy,
                agriculture, water, heat resilience, and disaster response.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {['Visibility across global builders', 'Access to climate innovation pipelines', 'Brand impact with measurable outcomes'].map((point) => (
                  <div key={point} className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-4">
                    <p className="text-sm font-medium text-cyan-100">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://forms.gle/qMkdiyCmuAjyH36Y7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-cyan-300 to-indigo-300 px-6 py-3 text-sm font-semibold text-slate-950"
                >
                  Sponsor Application Form
                </a>
                <Link href="/faq" className="rounded-xl border border-slate-100/25 px-6 py-3 text-sm font-semibold text-slate-100">
                  Read event details
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