'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const TRACK_OPTIONS = [
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
  email: z.string().email('Invalid email address').max(100, 'Email must be at most 100 characters'),
  country: z.string().max(100, 'Country must be at most 100 characters').optional(),
  role: z.string().max(100, 'Role must be at most 100 characters').optional(),
  trackInterest: z.string().max(50).optional(),
  climateProblem: z.string().max(240, 'Max 240 characters').optional(),
  referralSource: z.string().max(200, 'Referral source must be at most 200 characters').optional(),
});

type FormData = z.infer<typeof schema>;

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

export function WaitlistForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, watch, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const climateProblem = watch('climateProblem') ?? '';

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);

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
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(json.error || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-primary/25 bg-primary-soft/10 p-6 text-center"
      >
        <h3 className="font-display text-2xl font-bold text-primary">You are on the waitlist</h3>
        <p className="mt-2 text-site-text/80">
          We will send launch updates and next steps to your inbox.
        </p>
        <p className="mt-1 text-sm text-primary">Contact: climateos26@gmail.com</p>
      </motion.div>
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
            className="h-12 w-full rounded-xl border border-site-border bg-site-card-elevated px-4 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200"
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
            className="h-12 w-full rounded-xl border border-site-border bg-site-card-elevated px-4 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200"
          />
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-site-text">Country</label>
          <input
            {...register('country')}
            placeholder="Country"
            className="h-12 w-full rounded-xl border border-site-border bg-site-card-elevated px-4 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-site-text">Role</label>
          <input
            {...register('role')}
            placeholder="Engineer, Designer, Researcher..."
            className="h-12 w-full rounded-xl border border-site-border bg-site-card-elevated px-4 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-site-text">Track Interest</label>
        <Controller
          name="trackInterest"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="h-12 w-full rounded-xl border border-site-border bg-site-card-elevated px-4 text-site-text focus:border-primary focus:outline-none cursor-pointer transition-all duration-200"
            >
              <option value="" className="bg-site-card-elevated text-site-text">Select a preferred track</option>
              {TRACK_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-site-card-elevated text-site-text">
                  {option.label}
                </option>
              ))}
            </select>
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
          className="w-full rounded-xl border border-site-border bg-site-card-elevated px-4 py-3 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200"
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
          className="h-12 w-full rounded-xl border border-site-border bg-site-card-elevated px-4 text-site-text placeholder:text-site-muted-dark/50 focus:border-primary focus:outline-none transition-all duration-200"
        />
      </div>

      {error && <p className="rounded-lg border border-error/20 bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}

      <Button type="submit" loading={submitting} className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:from-primary-hover hover:to-accent-hover font-bold shadow-md shadow-primary/5 transition-all">
        Submit Application Interest
      </Button>
    </form>
  );
}