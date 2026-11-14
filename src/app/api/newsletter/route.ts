import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

// POST /api/newsletter — Public email subscribe
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to Alphalinkx Signal.',
      });
    }

    await prisma.newsletterSubscriber.create({
      data: { email: cleanEmail },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the AlphaLinkx dispatch.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Failed to register subscription.' }, { status: 500 });
  }
}

// GET /api/newsletter — Protected admin subscriber list
export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });
    return NextResponse.json({ subscribers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve subscribers.' }, { status: 500 });
  }
}
