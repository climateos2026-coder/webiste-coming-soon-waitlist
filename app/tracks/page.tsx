'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Lock, X } from 'lucide-react';

const TRACKS = [
  { slug: 'heatshield', emoji: '🌡', name: 'HeatShield', domain: 'Urban heat resilience', summary: 'Build software that helps cities detect, predict, and reduce dangerous heat exposure in neighborhoods where vulnerability is highest.', focus: ['Heat risk mapping', 'Cooling access optimization', 'Public alert workflows'], datasets: 'Satellite land-surface temperature, urban land-use layers, local weather station feeds, public health risk indicators.', deliverables: 'A decision-ready map + intervention prioritization workflow that city teams can act on quickly.' },
  { slug: 'floodnet', emoji: '🌊', name: 'FloodNet', domain: 'Flood early intelligence', summary: 'Create early warning and response systems that convert weather, terrain, and field signals into actionable flood decisions.', focus: ['Flood nowcasting', 'Sensor data fusion', 'Emergency response orchestration'], datasets: 'Rainfall forecasts, watershed geometry, river gauge telemetry, historical flood footprint records.', deliverables: 'A flood-risk intelligence console with lead-time alerts and clear action recommendations.' },
  { slug: 'farmfuture', emoji: '🌾', name: 'FarmFuture', domain: 'Climate-smart agriculture', summary: 'Design adaptive planning tools for farmers facing changing rainfall, heat stress, and crop uncertainty.', focus: ['Yield risk insights', 'Water usage optimization', 'Adaptive crop planning'], datasets: 'Crop calendars, seasonal weather projections, soil moisture signals, field management logs.', deliverables: 'A practical advisory interface that supports crop choice, irrigation timing, and resilience planning.' },
  { slug: 'cleangrid', emoji: '⚡', name: 'CleanGrid', domain: 'Distributed clean energy', summary: 'Engineer planning and operations tooling for microgrids and decentralized renewable systems in vulnerable regions.', focus: ['Microgrid planning', 'Demand forecasting', 'Reliability analytics'], datasets: 'Energy demand profiles, solar/wind resource estimates, outage history, distribution topology metadata.', deliverables: 'A planning-and-operations toolkit that improves uptime, affordability, and renewable utilization.' },
  { slug: 'waterwatch', emoji: '💧', name: 'WaterWatch', domain: 'Groundwater and water systems', summary: 'Develop intelligence products for monitoring water stress, detecting misuse, and supporting long-term water resilience.', focus: ['Aquifer tracking', 'Leak and overuse detection', 'Community water dashboards'], datasets: 'Groundwater level time series, extraction records, utility network telemetry, recharge and rainfall data.', deliverables: 'A monitoring dashboard with anomaly detection and intervention guidance for water authorities.' },
  { slug: 'open', emoji: '🌐', name: 'Open Track', domain: 'Original climate problem', summary: 'Propose a strong, evidence-backed climate challenge outside the five core tracks and build a solution with clear deployment logic.', focus: ['Novel challenge framing', 'Impact justification', 'Deployment readiness'], datasets: 'Team-provided datasets, trusted public sources, and verifiable domain evidence selected by participants.', deliverables: 'A complete problem-to-solution narrative with prototype evidence and a realistic implementation path.' },
];

const TRACK_COLORS: Record<string, string> = {
  heatshield: '#F05454',
  floodnet: '#3BA7D9',
  farmfuture: '#6EC14B',
  cleangrid: '#F5C842',
  waterwatch: '#5BA7F0',
  open: '#A78BFA',
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.1 } }
} as const;

export default function TracksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<typeof TRACKS[0] | null>(null);

  const handleTrackClick = (track: typeof TRACKS[0]) => {
    setActiveTrack(track);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-site-bg pt-20 transition-colors duration-300">
        <section className="relative overflow-hidden bg-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,var(--glow-1),transparent_35%),radial-gradient(circle_at_80%_10%,var(--glow-2),transparent_30%),radial-gradient(circle_at_56%_80%,var(--glow-3),transparent_36%)] transition-colors duration-300" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="font-display text-5xl font-extrabold text-site-text md:text-6xl tracking-tight transition-colors"
            >
              Climate Tracks
            </motion.h1>
            <p className="mt-4 max-w-3xl text-lg text-site-muted transition-colors leading-relaxed">
              Explore all six tracks in one immersive space. Each track includes a clear domain, delivery focus, and outcome direction for high-impact projects.
            </p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {TRACKS.map((track) => (
                <motion.button
                  key={track.slug}
                  variants={cardVariants}
                  type="button"
                  onClick={() => handleTrackClick(track)}
                  className="rounded-2xl border border-site-border bg-site-card p-6 text-left transition-all duration-300 hover:scale-[1.02] group cursor-pointer shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]"
                  whileHover={{ 
                    borderColor: `${TRACK_COLORS[track.slug]}40`,
                    boxShadow: `0 12px 30px -10px ${TRACK_COLORS[track.slug]}20`
                  }}
                >
                  {/* Glowing background gradient on hover */}
                  <div 
                    className="absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" 
                    style={{ backgroundColor: TRACK_COLORS[track.slug] }}
                  />
                  
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
                        style={{ color: TRACK_COLORS[track.slug] }}
                      >
                        {track.domain}
                      </span>
                      <span 
                        className="h-2.5 w-2.5 rounded-full shadow-md transition-all duration-300"
                        style={{ 
                          backgroundColor: TRACK_COLORS[track.slug], 
                          boxShadow: `0 0 12px ${TRACK_COLORS[track.slug]}`
                        }}
                      />
                    </div>
                    
                    <h2 className="mt-3 font-display text-2xl font-bold text-site-text flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                      <span>{track.emoji}</span>
                      <span>{track.name}</span>
                    </h2>
                    
                    <p className="mt-3 text-sm text-site-muted line-clamp-3 leading-relaxed group-hover:text-site-text transition-colors duration-300">
                      {track.summary}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      Locked — Click to view
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            <div className="mt-16 flex justify-center z-10 relative">
              <Link href="/faq" className="rounded-xl border border-site-border bg-site-card px-8 py-3.5 text-sm font-semibold text-site-text transition-all hover:border-site-border-strong hover:bg-site-card-elevated shadow-sm hover:-translate-y-0.5 active:translate-y-0">
                Read participation FAQs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {isModalOpen && activeTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with strong blur and dark glassmorphic shade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 dark:bg-[#030615]/80 backdrop-blur-md"
            />

            {/* Modal Card with premium animations, border, and glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-site-border bg-site-card p-8 text-center shadow-xl backdrop-blur-xl md:p-10 transition-colors duration-300"
            >
              {/* Decorative radial gradients inside the card */}
              <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full blur-3xl opacity-20" style={{ backgroundColor: TRACK_COLORS[activeTrack.slug] }} />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl opacity-20" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 rounded-full border border-site-border bg-site-card-elevated p-2 text-site-muted transition hover:border-site-border-strong hover:text-site-text"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon Container with glowing layers */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-site-card border border-site-border relative">
                {/* Glowing drop shadow behind padlock */}
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-35" 
                  style={{ backgroundColor: TRACK_COLORS[activeTrack.slug] }}
                />
                
                {/* Outer animated rotating dashed ring for a futuristic tech look */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="absolute inset-[-4px] rounded-full border border-dashed"
                  style={{ borderColor: `${TRACK_COLORS[activeTrack.slug]}50` }}
                />

                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border"
                  style={{ 
                    borderColor: `${TRACK_COLORS[activeTrack.slug]}30`,
                    backgroundColor: `${TRACK_COLORS[activeTrack.slug]}15`
                  }}
                >
                  <Lock 
                    className="h-8 w-8 drop-shadow-md" 
                    style={{ color: TRACK_COLORS[activeTrack.slug] }}
                  />
                </motion.div>
              </div>

              {/* Heading */}
              <h3 className="mt-6 font-display text-3xl font-extrabold text-site-text tracking-tight transition-colors">
                {activeTrack.emoji} {activeTrack.name}
              </h3>
              <p 
                className="mt-2 text-xs uppercase tracking-[0.22em] font-bold border inline-block px-3 py-1 rounded-full transition-all duration-300"
                style={{ 
                  color: TRACK_COLORS[activeTrack.slug], 
                  borderColor: `${TRACK_COLORS[activeTrack.slug]}30`, 
                  backgroundColor: `${TRACK_COLORS[activeTrack.slug]}10` 
                }}
              >
                {activeTrack.domain}
              </p>
              
              <div className="my-6 border-t border-site-border/30" />

              <h4 
                className="font-display text-2xl font-bold bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${TRACK_COLORS[activeTrack.slug]}, #818cf8)` 
                }}
              >
                Details coming soon.
              </h4>
              <p className="mt-3 text-sm text-site-muted leading-relaxed transition-colors">
                The deep challenges, data streams, and operational guidelines for this track are currently locked. We are finalizing deployments with our city partners and research teams.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full rounded-xl py-3.5 text-sm font-bold text-slate-950 shadow-md transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  style={{ 
                    background: `linear-gradient(to right, ${TRACK_COLORS[activeTrack.slug]}, #6366f1)`
                  }}
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}