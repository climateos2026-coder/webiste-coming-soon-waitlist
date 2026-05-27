import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
      brevo: process.env.BREVO_API_KEY ? 'configured' : 'missing',
    },
  });
}