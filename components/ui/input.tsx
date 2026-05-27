import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-neutral-100">
          {label}
          {props.required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        className={clsx(
          'w-full h-11 px-4 rounded-md bg-neutral-700 border',
          error ? 'border-error' : 'border-neutral-600',
          'text-neutral-0 placeholder:text-neutral-300',
          'focus:outline-none focus:ring-2 focus:ring-teal-500',
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="text-xs text-error">{error}</span>}
      {helperText && !error && <span className="text-xs text-neutral-200">{helperText}</span>}
    </div>
  );
}