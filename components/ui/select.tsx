import { SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-site-text/90">
          {label}
          {props.required && <span className="text-error">*</span>}
        </label>
      )}
      <select
        className={clsx(
          'w-full h-11 px-4 rounded-md bg-site-card-elevated border transition-all duration-200',
          error ? 'border-error/80 focus:border-error' : 'border-site-border focus:border-primary/80',
          'text-site-text',
          'focus:outline-none focus:ring-2 focus:ring-primary/20',
          'appearance-none cursor-pointer',
          className
        )}
        aria-invalid={!!error}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-site-card-elevated text-site-text">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}