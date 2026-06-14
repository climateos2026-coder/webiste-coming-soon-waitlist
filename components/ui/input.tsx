import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-site-text/90">
          {label}
          {props.required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        className={cn(
          'w-full h-11 px-4 rounded-md bg-site-card-elevated border transition-all duration-200',
          error ? 'border-error/80 focus:border-error' : 'border-site-border focus:border-primary/80',
          'text-site-text placeholder:text-site-muted-dark/60',
          'focus:outline-none focus:ring-2 focus:ring-primary/20',
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="text-xs text-error">{error}</span>}
      {helperText && !error && <span className="text-xs text-site-muted">{helperText}</span>}
    </div>
  );
}