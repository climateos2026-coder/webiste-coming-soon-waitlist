import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4", className)}>
      {children}
    </div>
  );
}