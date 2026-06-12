'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function ParticipantCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const supabase = createClient();

    const fetchCount = async () => {
      try {
        const { count } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        if (!abortController.signal.aborted) {
          setCount(count ?? 0);
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

    const channel = supabase
      .channel('waitlist-counter')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'waitlist' }, () => {
        setCount(c => (c === null ? 1 : c + 1));
      })
      .subscribe();

    return () => {
      abortController.abort();
      supabase.removeChannel(channel);
    };
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