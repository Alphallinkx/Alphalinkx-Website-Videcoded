import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: admin.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify admin session.' }, { status: 500 });
  }
}
