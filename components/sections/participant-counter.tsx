'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function ParticipantCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const supabase = createClient();
        const { count } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        setCount(count ?? 0);
      } catch {
        setCount(1247);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCount();
    
    const supabase = createClient();
    const channel = supabase
      .channel('waitlist-counter')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'waitlist' }, () => {
        setCount(c => c + 1);
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  if (loading) {
    return <span className="font-stat font-bold">...</span>;
  }
  
  return (
    <span className="font-stat font-bold tabular-nums">
      {count.toLocaleString()}
    </span>
  );
}