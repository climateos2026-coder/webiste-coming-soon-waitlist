import { RefObject, useEffect } from 'react';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useFocusTrap(active: boolean, containerRef: RefObject<HTMLElement | null>, returnFocusRef?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocusElement = returnFocusRef?.current;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
      .filter(element => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
    const first = focusable[0];

    requestAnimationFrame(() => first?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const currentFocusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
        .filter(element => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');

      if (currentFocusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = currentFocusable[0];
      const lastElement = currentFocusable[currentFocusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      returnFocusElement?.focus();
      previousFocus?.focus();
    };
  }, [active, containerRef, returnFocusRef]);
}
