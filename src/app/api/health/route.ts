import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    agency: 'Alphalinkx Digital Agency',
    timestamp: new Date().toISOString(),
    framework: 'Next.js 14 App Router',
  });
}
