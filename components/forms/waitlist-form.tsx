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
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Invalid email address'),
  country: z.string().optional(),
  role: z.string().optional(),
  trackInterest: z.string().optional(),
  climateProblem: z.string().max(240, 'Max 240 characters').optional(),
  referralSource: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

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
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        className="rounded-2xl border border-cyan-200/25 bg-cyan-300/10 p-6 text-center"
      >
        <h3 className="font-display text-2xl font-bold text-cyan-100">You are on the waitlist</h3>
        <p className="mt-2 text-slate-200/80">
          We will send launch updates and next steps to your inbox.
        </p>
        <p className="mt-1 text-sm text-cyan-200/85">Contact: climateos26@gmail.com</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-100">Name</label>
          <input
            {...register('name')}
            required
            placeholder="Your full name"
            className="h-12 w-full rounded-xl border border-slate-200/20 bg-slate-950/70 px-4 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-300/60 focus:outline-none"
          />
          {errors.name && <p className="text-xs text-rose-300">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-100">Email</label>
          <input
            {...register('email')}
            type="email"
            required
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-slate-200/20 bg-slate-950/70 px-4 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-300/60 focus:outline-none"
          />
          {errors.email && <p className="text-xs text-rose-300">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-100">Country</label>
          <input
            {...register('country')}
            placeholder="Country"
            className="h-12 w-full rounded-xl border border-slate-200/20 bg-slate-950/70 px-4 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-300/60 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-100">Role</label>
          <input
            {...register('role')}
            placeholder="Engineer, Designer, Researcher..."
            className="h-12 w-full rounded-xl border border-slate-200/20 bg-slate-950/70 px-4 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-300/60 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-100">Track Interest</label>
        <Controller
          name="trackInterest"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="h-12 w-full rounded-xl border border-slate-200/20 bg-slate-950/70 px-4 text-slate-100 focus:border-cyan-300/60 focus:outline-none"
            >
              <option value="">Select a preferred track</option>
              {TRACK_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-100">Climate problem on your mind</label>
        <textarea
          {...register('climateProblem')}
          maxLength={240}
          rows={4}
          placeholder="What urgent challenge do you want to work on?"
          className="w-full rounded-xl border border-slate-200/20 bg-slate-950/70 px-4 py-3 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-300/60 focus:outline-none"
        />
        <div className="flex items-center justify-between">
          {errors.climateProblem ? (
            <p className="text-xs text-rose-300">{errors.climateProblem.message}</p>
          ) : (
            <p className="text-xs text-slate-300/70">Optional, 240 characters max</p>
          )}
          <p className="text-xs text-cyan-200/80">{climateProblem.length}/240</p>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-100">How did you hear about ClimateOS?</label>
        <input
          {...register('referralSource')}
          placeholder="Community, friend, social, newsletter..."
          className="h-12 w-full rounded-xl border border-slate-200/20 bg-slate-950/70 px-4 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-300/60 focus:outline-none"
        />
      </div>

      {error && <p className="rounded-lg border border-rose-300/20 bg-rose-300/10 px-3 py-2 text-sm text-rose-200">{error}</p>}

      <Button type="submit" loading={submitting} className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-300 to-indigo-300 text-slate-950 hover:from-cyan-200 hover:to-indigo-200">
        Submit Application Interest
      </Button>
    </form>
  );
}