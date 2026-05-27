import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  country: z.string().optional(),
  role: z.string().optional(),
  trackInterests: z.array(z.string()).optional(),
  climateProblem: z.string().max(240).optional(),
  referralSource: z.string().optional(),
});

async function sendWelcomeEmail(email: string, name: string) {
  if (!process.env.BREVO_API_KEY) {
    console.warn('Brevo API key not configured, skipping email');
    return;
  }
  
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: [{ email, name }],
      from: {
        email: process.env.BREVO_FROM_EMAIL!,
        name: process.env.BREVO_FROM_NAME!,
      },
      subject: 'Welcome to ClimateOS 2026!',
      htmlContent: `
        <h1 style="color: #0E8970;">Welcome to ClimateOS 2026!</h1>
        <p>Hey ${name},</p>
        <p>You're on the waitlist! Here's what happens next:</p>
        <ul>
          <li>Applications open July 21, 2026</li>
          <li>We'll announce track reveals bi-weekly</li>
          <li>Official contact: climateos26@gmail.com</li>
        </ul>
        <p>Stay tuned for updates!</p>
        <p>- ClimateOS Team</p>
      `,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Brevo email error:', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', parsed.data.email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "You're already on the list!" },
        { status: 409 }
      );
    }

    const { error } = await supabase.from('waitlist').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      country: parsed.data.country,
      role: parsed.data.role,
      track_interests: parsed.data.trackInterests ?? [],
      climate_problem: parsed.data.climateProblem,
      referral_source: parsed.data.referralSource,
    });

    if (error) throw error;

    await sendWelcomeEmail(parsed.data.email, parsed.data.name).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}