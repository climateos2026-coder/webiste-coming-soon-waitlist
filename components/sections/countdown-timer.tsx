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
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const p = getActivePhase();
      const remaining = getTimeRemaining(p.target);

      const animFrame = requestAnimationFrame(() => {
        setUserTZ(tz);
        setPhase(p);
        setTime(remaining);
      });

      const tick = setInterval(() => {
        setTime(getTimeRemaining(p.target));
        setPhase(getActivePhase());
      }, 1000);

      return () => {
        cancelAnimationFrame(animFrame);
        clearInterval(tick);
      };
    }
  }, []);

  const localTime = formatInTimeZone(
    phase.target,
    userTZ,
    "MMM d, h:mm aa zzz"
  );
  
  const utcTime = formatInTimeZone(
    phase.target,
    'UTC',
    "HH:mm zzz"
  );

  return (
    <div className="flex flex-col items-center gap-4 p-6 border border-primary/20 rounded-2xl bg-site-card shadow-lg shadow-primary/5 animate-pulse-glow">
      <p className="text-site-text text-sm font-semibold tracking-wider uppercase">
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
      <p className="text-site-muted text-xs">
        ⏰ Your local time: <span className="text-primary font-semibold font-mono">{localTime}</span> ({utcTime})
      </p>
    </div>
  );
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-site-card-elevated rounded-lg px-3 py-2 min-w-[60px] text-center border border-site-border shadow-lg">
        <span className="font-stat font-semibold text-4xl text-site-text tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-body text-xs font-medium text-site-muted tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return <span className="font-stat font-bold text-4xl text-primary pt-2">:</span>;
}