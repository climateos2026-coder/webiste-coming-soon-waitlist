'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import isDisposableEmail from 'is-disposable-email';

const inputClass = "h-12 w-full rounded-xl border border-site-border bg-site-card-elevated px-4 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200";
const textareaClass = "w-full rounded-xl border border-site-border bg-site-card-elevated px-4 py-3 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200";

const TRACK_OPTIONS = [
  { value: '', label: 'Select a preferred track' },
  { value: 'heatshield', label: 'HeatShield - Urban Heat Islands' },
  { value: 'floodnet', label: 'FloodNet - Flood Warning Systems' },
  { value: 'farmfuture', label: 'FarmFuture - Climate Agriculture' },
  { value: 'cleangrid', label: 'CleanGrid - Microgrids' },
  { value: 'waterwatch', label: 'WaterWatch - Groundwater' },
  { value: 'open', label: 'Open Track' },
];

const schema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be at most 80 characters')
    .refine(val => !/[\r\n]/.test(val), 'Name cannot contain line breaks'),
  email: z.string().email('Invalid email address').max(100, 'Email must be at most 100 characters')
    .refine((email) => !isDisposableEmail(email), 'Disposable emails not allowed'),
  country: z.string().max(100, 'Country must be at most 100 characters').optional(),
  role: z.string().max(100, 'Role must be at most 100 characters').optional(),
  trackInterest: z.string().max(50).optional(),
  climateProblem: z.string().max(240, 'Max 240 characters').optional(),
  referralSource: z.string().max(200, 'Referral source must be at most 200 characters').optional(),
});

type FormData = z.infer<typeof schema>;

interface WaitlistFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const DRAFT_KEY = 'climateos_waitlist_draft';
const KNOWN_FIELDS: Array<keyof FormData> = ['name', 'email', 'country', 'role', 'trackInterest', 'climateProblem', 'referralSource'];

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

export function WaitlistForm({ onSuccess, onError }: WaitlistFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isReviseMode, setIsReviseMode] = useState(false);

  const { register, watch, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const climateProblem = watch('climateProblem') ?? '';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (!saved) return;
      const draft = JSON.parse(saved) as Partial<FormData>;
      const filtered = Object.fromEntries(
        Object.entries(draft).filter(([key]) => (KNOWN_FIELDS as string[]).includes(key))
      ) as Partial<FormData>;
      if (Object.keys(filtered).length > 0) {
        reset(filtered);
      }
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, [reset]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const subscription = watch((value) => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(value));
      } catch {
        localStorage.removeItem(DRAFT_KEY);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = useCallback(async (data: FormData) => {
    setSubmitting(true);
    setFormError(null);

    const payload = {
      ...data,
      trackInterests: data.trackInterest ? [data.trackInterest] : [],
    };

    try {
      const csrfToken = getCookie('csrf_token');
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken || '',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok) {
        localStorage.removeItem(DRAFT_KEY);
        onSuccess?.();
      } else {
        if (res.status === 429) {
          setFormError('Too many attempts. Please wait a moment before trying again.');
        } else if (res.status === 403) {
          setFormError('Security validation failed. Please refresh the page and try again.');
        } else {
          setFormError(json.error || 'Something went wrong');
        }
        onError?.();
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.');
      onError?.();
    } finally {
      setSubmitting(false);
    }
  }, [onSuccess, onError]);

  const handleReviseLater = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      name: '',
      email: '',
      country: '',
      role: '',
      trackInterest: '',
      climateProblem: '',
      referralSource: '',
    }));
    setIsReviseMode(true);
  };

  if (isReviseMode) {
    return (
      <div className="rounded-2xl border border-site-border bg-site-card-elevated/50 p-8 text-center min-h-[480px] flex flex-col items-center justify-center">
        <p className="font-display text-xl font-bold text-primary mb-2">Saved for later</p>
        <p className="text-sm text-site-muted max-w-sm">
          Your information has been saved locally. Come back anytime to continue your application.
        </p>
        <Button
          type="button"
          onClick={() => setIsReviseMode(false)}
          className="mt-6 rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:from-primary-hover hover:to-accent-hover"
        >
          Continue Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-site-text">Name</label>
          <input
            {...register('name')}
            required
            placeholder="Your full name"
            className={inputClass}
          />
          {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-site-text">Email</label>
          <input
            {...register('email')}
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-site-text">Country</label>
          <input
            {...register('country')}
            placeholder="Country"
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-site-text">Role</label>
          <input
            {...register('role')}
            placeholder="Engineer, Designer, Researcher..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-site-text">Track Interest</label>
        <Controller
          name="trackInterest"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={TRACK_OPTIONS}
              className="h-12 rounded-xl"
            />
          )}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-site-text">Climate problem on your mind</label>
        <textarea
          {...register('climateProblem')}
          maxLength={240}
          rows={4}
          placeholder="What urgent challenge do you want to work on?"
          className={textareaClass}
        />
        <div className="flex items-center justify-between">
          {errors.climateProblem ? (
            <p className="text-xs text-error">{errors.climateProblem.message}</p>
          ) : (
            <p className="text-xs text-site-muted">Optional, 240 characters max</p>
          )}
          <p className="text-xs text-primary font-semibold">{climateProblem.length}/240</p>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-site-text">How did you hear about ClimateOS?</label>
        <input
          {...register('referralSource')}
          placeholder="Community, friend, social, newsletter..."
          className={inputClass}
        />
      </div>

      {formError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-error/20 bg-error/10 px-3 py-2 text-sm text-error"
        >
          {formError}
        </motion.div>
      )}

      <Button
        type="submit"
        loading={submitting}
        disabled={submitting}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:from-primary-hover hover:to-accent-hover font-bold shadow-md shadow-primary/5 transition-all"
      >
        {submitting ? 'Submitting...' : 'Submit Application Interest'}
      </Button>

      <button
        type="button"
        onClick={handleReviseLater}
        className="w-full text-center text-xs text-site-muted hover:text-primary transition-colors pt-2"
      >
        Save for later and continue another time
      </button>
    </form>
  );
}
