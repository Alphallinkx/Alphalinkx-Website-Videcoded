import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const [totalInquiries, newInquiries, totalProjects, totalSubscribers, totalServices] =
      await Promise.all([
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: 'NEW' } }),
        prisma.project.count(),
        prisma.newsletterSubscriber.count(),
        prisma.service.count(),
      ]);

    const rawServices = await prisma.inquiry.groupBy({
      by: ['service'],
      _count: { service: true },
    });

    return NextResponse.json({
      stats: {
        totalInquiries,
        newInquiries,
        totalProjects,
        totalSubscribers,
        totalServices,
        inquiriesByService: rawServices.map((item) => ({
          service: item.service,
          count: item._count.service,
        })),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve administrative analytics.' }, { status: 500 });
  }
}
