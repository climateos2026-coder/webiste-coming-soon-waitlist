'use client';

import { useState, useEffect } from 'react';
import { formatInTimeZone } from 'date-fns-tz';

const PHASES = [
  { label: 'Sprint begins in', target: new Date('2026-10-10T19:00:00Z') },
  { label: 'Submissions close in', target: new Date('2026-10-12T19:00:00Z') },
  { label: 'Finals begin in', target: new Date('2026-10-17T13:30:00Z') },
];

function getActivePhase() {
  const now = new Date();
  return PHASES.find(p => p.target > now) ?? PHASES[PHASES.length - 1];
}

function getTimeRemaining(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000),
  };
}



export function CountdownTimer() {
  // Use same initial values for server and client to prevent hydration mismatch
  const [phase, setPhase] = useState<typeof PHASES[0]>(PHASES[0]);
  const [time, setTime] = useState<ReturnType<typeof getTimeRemaining>>(() => getTimeRemaining(PHASES[0].target));
  const [userTZ, setUserTZ] = useState<string>('UTC');

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      setUserTZ(Intl.DateTimeFormat().resolvedOptions().timeZone);
      
      const p = getActivePhase();
      setPhase(p);
      setTime(getTimeRemaining(p.target));

      const tick = setInterval(() => {
        setTime(getTimeRemaining(p.target));
        setPhase(getActivePhase());
      }, 1000);
      return () => clearInterval(tick);
    }
  }, []);

  const localTime = formatInTimeZone(
    phase.target,
    userTZ,
    "MMM d, h:mm aa zzz"
  );

  return (
    <div className="flex flex-col items-center gap-4 p-6 border border-teal-800 rounded-2xl bg-neutral-800 animate-pulse-glow">
      <p className="text-neutral-100 text-sm font-medium tracking-wider uppercase">
        {phase.label}
      </p>
      <div className="flex items-start gap-2" aria-live="polite" aria-atomic="true">
        <Digit value={time.days} label="Days" />
        <Colon />
        <Digit value={time.hours} label="Hrs" />
        <Colon />
        <Digit value={time.minutes} label="Min" />
        <Colon />
        <Digit value={time.seconds} label="Sec" />
      </div>
      <p className="text-neutral-300 text-xs">
        ⏰ Your local time: <span className="text-teal-300 font-mono">{localTime}</span> (19:00 UTC)
      </p>
    </div>
  );
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-neutral-700 rounded-lg px-3 py-2 min-w-[60px] text-center border border-neutral-600 shadow-lg">
        <span className="font-stat font-semibold text-4xl text-neutral-0 tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-body text-xs font-medium text-neutral-200 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return <span className="font-stat font-bold text-4xl text-teal-500 pt-2">:</span>;
}