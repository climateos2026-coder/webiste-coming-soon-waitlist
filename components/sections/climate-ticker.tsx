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
    <div className="bg-primary-soft/10 border-y border-site-border py-3 overflow-hidden" aria-live="polite" role="marquee">
      <div className="flex animate-ticker whitespace-nowrap">
        {allStats.map((stat, index) => (
          <span
            key={`${stat.id}-${index}`}
            className="flex items-center gap-2 text-sm font-mono text-site-muted hover:text-primary transition-colors mx-6"
          >
            <span className="text-lg">{stat.emoji}</span>
            <span>{stat.text}: <span className="text-accent font-semibold">{stat.value}</span></span>
            <span className="text-site-muted-dark/50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}