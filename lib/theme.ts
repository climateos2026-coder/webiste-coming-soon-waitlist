export type AppTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME: AppTheme = 'dark';

export function isValidTheme(value: string | null): value is AppTheme {
  return value === 'dark' || value === 'light';
}

export function getInitialTheme(): AppTheme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isValidTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
}

export function applyTheme(theme: AppTheme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function setStoredTheme(theme: AppTheme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

export function toggleStoredTheme() {
  const nextTheme = getInitialTheme() === 'dark' ? 'light' : 'dark';
  setStoredTheme(nextTheme);
  return nextTheme;
}

export function getThemeInitScript() {
  return `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:'${DEFAULT_THEME}');}catch(e){}`;
}
