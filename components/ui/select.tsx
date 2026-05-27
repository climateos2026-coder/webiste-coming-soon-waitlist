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
        <label className="text-sm font-medium text-neutral-100">
          {label}
          {props.required && <span className="text-error">*</span>}
        </label>
      )}
      <select
        className={clsx(
          'w-full h-11 px-4 rounded-md bg-neutral-700 border',
          error ? 'border-error' : 'border-neutral-600',
          'text-neutral-0',
          'focus:outline-none focus:ring-2 focus:ring-teal-500',
          'appearance-none cursor-pointer',
          className
        )}
        aria-invalid={!!error}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-neutral-800">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}