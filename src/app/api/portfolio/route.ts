import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });

    const parsedProjects = projects.map((p) => ({
      ...p,
      results: p.results ? JSON.parse(p.results) : [],
      services: p.services ? JSON.parse(p.services) : [],
      technologies: p.technologies ? JSON.parse(p.technologies) : [],
    }));

    return NextResponse.json({ projects: parsedProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to retrieve portfolio projects.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        slug: body.slug,
        title: body.title,
        client: body.client,
        category: body.category,
        summary: body.summary,
        challenge: body.challenge,
        solution: body.solution,
        results: JSON.stringify(body.results || []),
        services: JSON.stringify(body.services || []),
        technologies: JSON.stringify(body.technologies || []),
        liveUrl: body.liveUrl,
        imageUrl: body.imageUrl,
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}
