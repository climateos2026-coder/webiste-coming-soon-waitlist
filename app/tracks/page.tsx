'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const TRACKS = [
  { slug: 'heatshield', emoji: '🌡', name: 'HeatShield', domain: 'Urban heat resilience', summary: 'Build software that helps cities detect, predict, and reduce dangerous heat exposure in neighborhoods where vulnerability is highest.', focus: ['Heat risk mapping', 'Cooling access optimization', 'Public alert workflows'], datasets: 'Satellite land-surface temperature, urban land-use layers, local weather station feeds, public health risk indicators.', deliverables: 'A decision-ready map + intervention prioritization workflow that city teams can act on quickly.' },
  { slug: 'floodnet', emoji: '🌊', name: 'FloodNet', domain: 'Flood early intelligence', summary: 'Create early warning and response systems that convert weather, terrain, and field signals into actionable flood decisions.', focus: ['Flood nowcasting', 'Sensor data fusion', 'Emergency response orchestration'], datasets: 'Rainfall forecasts, watershed geometry, river gauge telemetry, historical flood footprint records.', deliverables: 'A flood-risk intelligence console with lead-time alerts and clear action recommendations.' },
  { slug: 'farmfuture', emoji: '🌾', name: 'FarmFuture', domain: 'Climate-smart agriculture', summary: 'Design adaptive planning tools for farmers facing changing rainfall, heat stress, and crop uncertainty.', focus: ['Yield risk insights', 'Water usage optimization', 'Adaptive crop planning'], datasets: 'Crop calendars, seasonal weather projections, soil moisture signals, field management logs.', deliverables: 'A practical advisory interface that supports crop choice, irrigation timing, and resilience planning.' },
  { slug: 'cleangrid', emoji: '⚡', name: 'CleanGrid', domain: 'Distributed clean energy', summary: 'Engineer planning and operations tooling for microgrids and decentralized renewable systems in vulnerable regions.', focus: ['Microgrid planning', 'Demand forecasting', 'Reliability analytics'], datasets: 'Energy demand profiles, solar/wind resource estimates, outage history, distribution topology metadata.', deliverables: 'A planning-and-operations toolkit that improves uptime, affordability, and renewable utilization.' },
  { slug: 'waterwatch', emoji: '💧', name: 'WaterWatch', domain: 'Groundwater and water systems', summary: 'Develop intelligence products for monitoring water stress, detecting misuse, and supporting long-term water resilience.', focus: ['Aquifer tracking', 'Leak and overuse detection', 'Community water dashboards'], datasets: 'Groundwater level time series, extraction records, utility network telemetry, recharge and rainfall data.', deliverables: 'A monitoring dashboard with anomaly detection and intervention guidance for water authorities.' },
  { slug: 'open', emoji: '🌐', name: 'Open Track', domain: 'Original climate problem', summary: 'Propose a strong, evidence-backed climate challenge outside the five core tracks and build a solution with clear deployment logic.', focus: ['Novel challenge framing', 'Impact justification', 'Deployment readiness'], datasets: 'Team-provided datasets, trusted public sources, and verifiable domain evidence selected by participants.', deliverables: 'A complete problem-to-solution narrative with prototype evidence and a realistic implementation path.' },
];

export default function TracksPage() {
  const [selected, setSelected] = useState(TRACKS[0].slug);
  const selectedTrack = useMemo(() => TRACKS.find((track) => track.slug === selected) ?? TRACKS[0], [selected]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050712] pt-20">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.24),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(192,132,252,0.2),transparent_30%),radial-gradient(circle_at_56%_80%,rgba(45,212,191,0.18),transparent_36%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-extrabold text-white md:text-6xl">
              Climate Tracks
            </motion.h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-200/85">
              Explore all six tracks in one immersive space. Each track includes a clear domain, delivery focus, and outcome direction for high-impact projects.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {TRACKS.map((track) => (
                <button
                  key={track.slug}
                  type="button"
                  onClick={() => setSelected(track.slug)}
                  className={`rounded-2xl border p-4 text-left transition ${selected === track.slug ? 'border-cyan-200/70 bg-cyan-300/20' : 'border-slate-100/15 bg-slate-900/50 hover:border-slate-100/35'}`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">{track.domain}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white"><span className="mr-2">{track.emoji}</span>{track.name}</h2>
                </button>
              ))}
            </div>

            <motion.div key={selectedTrack.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-3xl border border-slate-100/15 bg-[#0b1022]/80 p-7 backdrop-blur-lg md:p-10">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">{selectedTrack.domain}</p>
              <h3 className="mt-2 font-display text-4xl font-bold text-white">{selectedTrack.name}</h3>
              <p className="mt-4 max-w-4xl text-slate-200/85">{selectedTrack.summary}</p>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {selectedTrack.focus.map((item, idx) => (
                  <motion.div key={item} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-4">
                    <p className="text-sm font-medium text-cyan-100">{item}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-indigo-200/20 bg-indigo-300/10 p-5">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-indigo-100/70">Datasets and Inputs</h4>
                  <p className="mt-2 text-sm text-slate-200/80">{selectedTrack.datasets}</p>
                </article>
                <article className="rounded-2xl border border-emerald-200/20 bg-emerald-300/10 p-5">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">Expected Deliverable</h4>
                  <p className="mt-2 text-sm text-slate-200/80">{selectedTrack.deliverables}</p>
                </article>
              </div>

              <div className="mt-8">
                <a href="/faq" className="rounded-xl border border-slate-100/25 px-6 py-3 text-sm font-semibold text-slate-100">
                  Read participation FAQs
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}