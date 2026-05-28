import { ReactNode } from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'default' | 'track' | 'open' | 'closed' | 'soon' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  color?: string;
}

export function Badge({ children, variant = 'default', color }: BadgeProps) {
  const variantClasses = {
    default: 'bg-site-card-elevated text-site-text border border-site-border',
    track: 'text-white bg-primary/20',
    open: 'bg-primary/10 text-primary border border-primary/20 dark:text-primary-soft',
    closed: 'bg-site-card-elevated text-site-muted-dark',
    soon: 'bg-accent/10 text-accent border border-accent/20 dark:text-accent-soft',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    error: 'bg-error/10 text-error border border-error/20',
  };
  
  return (
    <span 
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide',
        variantClasses[variant]
      )}
      style={color ? { backgroundColor: `${color}20`, color } : undefined}
    >
      {children}
    </span>
  );
}