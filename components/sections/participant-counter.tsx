'use client';

import { useEffect, useState } from 'react';

export function ParticipantCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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
          setCount(data.count);
        }
      } catch {
        if (!abortController.signal.aborted) {
          setCount(null);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCount();

    return () => abortController.abort();
  }, []);

  if (loading) {
    return <span className="font-stat font-bold">...</span>;
  }

  if (count === null) {
    return null;
  }

  return (
    <span className="font-stat font-bold tabular-nums">
      {count.toLocaleString()}
    </span>
  );
}