import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-site-card border border-site-border rounded-xl p-6',
        hover && 'hover:border-primary hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-primary/5',
        className
      )}
    >
      {children}
    </div>
  );
}