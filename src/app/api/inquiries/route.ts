import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendInquiryNotification, sendClientConfirmation } from '@/lib/email';
import { verifyAdminToken } from '@/lib/auth';

// POST /api/inquiries — Public inquiry submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, timeline, description, honeypot } = body;

    // Spam honeypot detection
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Inquiry received.' });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid full name (minimum 2 characters).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid business email address.' }, { status: 400 });
    }

    if (!service || typeof service !== 'string') {
      return NextResponse.json({ error: 'Please select a service category.' }, { status: 400 });
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide a brief project description (minimum 10 characters).' }, { status: 400 });
    }

    // Check duplicate recent submissions within 5 minutes
    const recentDuplicate = await prisma.inquiry.findFirst({
      where: {
        email: email.trim().toLowerCase(),
        description: description.trim(),
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000),
        },
      },
    });

    if (recentDuplicate) {
      return NextResponse.json({
        success: true,
        message: 'Your project inquiry has already been received. Our team will contact you shortly.',
        inquiryId: recentDuplicate.id,
      });
    }

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company ? company.trim() : null,
        service: service.trim(),
        budget: budget ? budget.trim() : null,
        timeline: timeline ? timeline.trim() : null,
        description: description.trim(),
        status: 'NEW',
      },
    });

    // Send asynchronous email notifications
    sendInquiryNotification(inquiry).catch((err) => console.error('Agency notification error:', err));
    sendClientConfirmation({
      name: inquiry.name,
      email: inquiry.email,
      service: inquiry.service,
    }).catch((err) => console.error('Client acknowledgement error:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully! We will review your brief within 24 hours.',
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project inquiry:', error);
    return NextResponse.json({ error: 'An unexpected server error occurred. Please try again later.' }, { status: 500 });
  }
}

// GET /api/inquiries — Protected Admin List
export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required. Missing or invalid token.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } },
        { service: { contains: search } },
      ];
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.inquiry.count({ where }),
    ]);

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error retrieving inquiries:', error);
    return NextResponse.json({ error: 'Failed to retrieve project inquiries.' }, { status: 500 });
  }
}
