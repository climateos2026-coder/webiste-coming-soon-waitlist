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
    default: 'bg-neutral-700 text-neutral-100',
    track: 'text-white',
    open: 'bg-teal-900/50 text-teal-300',
    closed: 'bg-neutral-800/50 text-neutral-400',
    soon: 'bg-amber-900/50 text-amber-300',
    success: 'bg-teal-900/50 text-teal-300',
    warning: 'bg-amber-900/50 text-amber-300',
    error: 'bg-red-900/50 text-red-300',
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