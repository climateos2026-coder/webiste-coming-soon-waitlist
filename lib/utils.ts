import { formatInTimeZone } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function formatDate(date: Date, timezone: string): string {
  return formatInTimeZone(date, timezone, 'PPp', { locale: enUS });
}

export function getTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function cn(...classes: (string | undefined | false)[]) {
  return twMerge(classes.filter(Boolean).join(' '));
}