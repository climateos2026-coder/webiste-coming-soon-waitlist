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
        'bg-neutral-800 border border-neutral-600 rounded-xl p-6',
        hover && 'hover:border-teal-500 hover:-translate-y-0.5 transition-all',
        className
      )}
    >
      {children}
    </div>
  );
}