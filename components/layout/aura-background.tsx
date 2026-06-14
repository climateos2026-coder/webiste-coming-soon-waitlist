type AuraVariant = 'primary' | 'accent' | 'mixed' | 'subtle';

export function AuraBackground({ variant = 'mixed', className = '' }: { variant?: AuraVariant; className?: string }) {
  const variants = {
    primary: 'bg-[radial-gradient(circle_at_20%_20%,var(--glow-1),transparent_35%),radial-gradient(circle_at_80%_80%,var(--glow-2),transparent_35%)]',
    accent: 'bg-[radial-gradient(circle_at_15%_20%,var(--glow-3),transparent_35%),radial-gradient(circle_at_80%_15%,var(--glow-1),transparent_35%)]',
    mixed: 'bg-[radial-gradient(circle_at_20%_20%,var(--glow-1),transparent_36%),radial-gradient(circle_at_80%_10%,var(--glow-2),transparent_30%),radial-gradient(circle_at_45%_78%,var(--glow-3),transparent_40%),radial-gradient(circle_at_70%_65%,var(--glow-4),transparent_36%)]',
    subtle: 'bg-[radial-gradient(circle_at_10%_15%,var(--glow-3),transparent_30%),radial-gradient(circle_at_75%_8%,var(--glow-1),transparent_28%)]',
  };

  return <div className={`pointer-events-none absolute inset-0 ${variants[variant]} transition-colors duration-300 ${className}`} />;
}
