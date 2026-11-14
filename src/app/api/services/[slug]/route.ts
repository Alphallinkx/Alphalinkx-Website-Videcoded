import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    return NextResponse.json({
      service: {
        ...service,
        capabilities: service.capabilities ? JSON.parse(service.capabilities) : [],
        deliverables: service.deliverables ? JSON.parse(service.deliverables) : [],
        process: service.process ? JSON.parse(service.process) : [],
        faqs: service.faqs ? JSON.parse(service.faqs) : [],
      },
    });
  } catch (error) {
    console.error('Error fetching service detail:', error);
    return NextResponse.json({ error: 'Failed to retrieve service details.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const { slug } = params;
    const body = await request.json();
    const service = await prisma.service.update({
      where: { slug },
      data: {
        title: body.title,
        shortDesc: body.shortDesc,
        fullDesc: body.fullDesc,
        icon: body.icon,
        capabilities: body.capabilities ? JSON.stringify(body.capabilities) : undefined,
        deliverables: body.deliverables ? JSON.stringify(body.deliverables) : undefined,
        process: body.process ? JSON.stringify(body.process) : undefined,
        faqs: body.faqs ? JSON.stringify(body.faqs) : undefined,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service.' }, { status: 500 });
  }
}
