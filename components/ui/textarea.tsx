import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ label, error, helperText, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-site-text/90">
          {label}
          {props.required && <span className="text-error">*</span>}
        </label>
      )}
      <textarea
        className={cn(
          'w-full min-h-20 px-4 py-2 rounded-md bg-site-card-elevated border transition-all duration-200',
          error ? 'border-error/80 focus:border-error' : 'border-site-border focus:border-primary/80',
          'text-site-text placeholder:text-site-muted-dark/60',
          'focus:outline-none focus:ring-2 focus:ring-primary/20',
          'resize-vertical',
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