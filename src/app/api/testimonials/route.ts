import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to retrieve testimonials.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { clientName, role, company, quote, rating, project, avatarUrl, featured } = body;
    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        role,
        company,
        quote,
        rating: Number(rating) || 5,
        project,
        avatarUrl,
        featured: Boolean(featured),
      },
    });
    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial.' }, { status: 500 });
  }
}
