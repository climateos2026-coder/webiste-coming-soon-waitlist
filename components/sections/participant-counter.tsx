'use client';

import { useEffect, useState } from 'react';

type WaitlistCountState = 'loading' | 'ready' | 'error';

export function ParticipantCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [state, setState] = useState<WaitlistCountState>('loading');

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist-count', {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to load participant count');
        }

        const data = await response.json();
        if (!abortController.signal.aborted) {
          setCount(typeof data.count === 'number' ? data.count : 0);
          setState('ready');
        }
      } catch {
        if (!abortController.signal.aborted) {
          setState('error');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setState((currentState) => currentState === 'loading' ? 'error' : currentState);
        }
      }
    };

    fetchCount();

    return () => abortController.abort();
  }, []);

  if (state === 'loading') {
    return <span className="font-stat font-bold" aria-live="polite">Loading count</span>;
  }

  if (state === 'error' || count === null) {
    return <span className="font-stat font-bold" title="Participant count is temporarily unavailable">Unavailable</span>;
  }

  return (
    <span className="font-stat font-bold tabular-nums" aria-live="polite">
      {count.toLocaleString()}
    </span>
  );
}
