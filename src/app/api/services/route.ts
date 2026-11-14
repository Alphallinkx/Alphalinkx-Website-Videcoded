import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    const parsedServices = services.map((s) => ({
      ...s,
      capabilities: s.capabilities ? JSON.parse(s.capabilities) : [],
      deliverables: s.deliverables ? JSON.parse(s.deliverables) : [],
      process: s.process ? JSON.parse(s.process) : [],
      faqs: s.faqs ? JSON.parse(s.faqs) : [],
    }));

    return NextResponse.json({ services: parsedServices });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to retrieve agency services.' }, { status: 500 });
  }
}
