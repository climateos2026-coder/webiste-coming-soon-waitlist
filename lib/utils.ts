import { formatInTimeZone } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';

export function formatDate(date: Date, timezone: string): string {
  return formatInTimeZone(date, timezone, 'PPp', { locale: enUS });
}

export function getTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDateCompact(date: Date, timezone: string): string {
  return formatInTimeZone(date, timezone, 'MMM d');
}

export function formatTime(date: Date, timezone: string): string {
  return formatInTimeZone(date, timezone, 'p zzz');
}

export function formatUTC(date: Date): string {
  return formatInTimeZone(date, 'UTC', 'HH:mm');
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}