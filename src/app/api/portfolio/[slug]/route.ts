import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({
      project: {
        ...project,
        results: project.results ? JSON.parse(project.results) : [],
        services: project.services ? JSON.parse(project.services) : [],
        technologies: project.technologies ? JSON.parse(project.technologies) : [],
      },
    });
  } catch (error) {
    console.error('Error fetching project detail:', error);
    return NextResponse.json({ error: 'Failed to retrieve project details.' }, { status: 500 });
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
    const project = await prisma.project.update({
      where: { slug },
      data: {
        title: body.title,
        client: body.client,
        category: body.category,
        summary: body.summary,
        challenge: body.challenge,
        solution: body.solution,
        results: body.results ? JSON.stringify(body.results) : undefined,
        services: body.services ? JSON.stringify(body.services) : undefined,
        technologies: body.technologies ? JSON.stringify(body.technologies) : undefined,
        liveUrl: body.liveUrl,
        imageUrl: body.imageUrl,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
        sortOrder: body.sortOrder !== undefined ? Number(body.sortOrder) : undefined,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const { slug } = params;
    await prisma.project.delete({ where: { slug } });
    return NextResponse.json({ success: true, message: 'Project removed.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}
