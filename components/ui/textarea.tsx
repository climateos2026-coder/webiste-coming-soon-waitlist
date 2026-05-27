import { TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ label, error, helperText, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-neutral-100">
          {label}
          {props.required && <span className="text-error">*</span>}
        </label>
      )}
      <textarea
        className={clsx(
          'w-full min-h-20 px-4 py-2 rounded-md bg-neutral-700 border',
          error ? 'border-error' : 'border-neutral-600',
          'text-neutral-0 placeholder:text-neutral-300',
          'focus:outline-none focus:ring-2 focus:ring-teal-500',
          'resize-vertical',
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