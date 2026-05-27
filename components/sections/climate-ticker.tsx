interface Stat {
  id: string;
  emoji: string;
  text: string;
  value: string;
  trackSlug?: string;
}

const STATS: Stat[] = [
  { id: '1', emoji: '🌡', text: 'Global temp anomaly', value: '+1.48°C', trackSlug: 'heatshield' },
  { id: '2', emoji: '🌊', text: 'Flood damage 2024', value: '$40B+', trackSlug: 'floodnet' },
  { id: '3', emoji: '💧', text: 'Groundwater stress', value: '54% areas', trackSlug: 'waterwatch' },
  { id: '4', emoji: '🌾', text: 'Farmland rainfed', value: '60%', trackSlug: 'farmfuture' },
  { id: '5', emoji: '⚡', text: 'People without power', value: '775M', trackSlug: 'cleangrid' },
];

export function ClimateTicker() {
  const allStats = [...STATS, ...STATS];

  return (
    <div className="bg-teal-900/50 border-y border-teal-800 py-3 overflow-hidden" aria-live="polite" role="marquee">
      <div className="flex animate-ticker whitespace-nowrap">
        {allStats.map((stat, index) => (
          <a
            key={`${stat.id}-${index}`}
            href={stat.trackSlug ? `/tracks/${stat.trackSlug}` : '#'}
            className="flex items-center gap-2 text-sm font-mono text-neutral-200 hover:text-teal-300 transition-colors mx-6"
          >
            <span className="text-lg">{stat.emoji}</span>
            <span>{stat.text}: <span className="text-amber-400 font-semibold">{stat.value}</span></span>
            <span className="text-neutral-500">·</span>
          </a>
        ))}
      </div>
    </div>
  );
}