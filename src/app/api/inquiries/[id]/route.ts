import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { status, notes } = body;

    const data: any = {};
    if (status) data.status = status;
    if (notes !== undefined) data.notes = notes;

    const updated = await prisma.inquiry.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Failed to update inquiry record.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const { id } = params;
    await prisma.inquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Inquiry archived and removed.' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json({ error: 'Failed to delete inquiry.' }, { status: 500 });
  }
}
