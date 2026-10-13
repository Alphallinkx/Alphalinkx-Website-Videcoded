import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/portfolio — Public list with category filter
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    const where: any = {};

    if (category && category !== 'All') {
      where.category = category as string;
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

    return res.json({ projects: parsedProjects });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return res.status(500).json({ error: 'Failed to retrieve portfolio projects.' });
  }
});

// GET /api/portfolio/:slug — Public project detail
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.json({
      project: {
        ...project,
        results: project.results ? JSON.parse(project.results) : [],
        services: project.services ? JSON.parse(project.services) : [],
        technologies: project.technologies ? JSON.parse(project.technologies) : [],
      },
    });
  } catch (error) {
    console.error('Error fetching project detail:', error);
    return res.status(500).json({ error: 'Failed to retrieve project detail.' });
  }
});

// POST /api/portfolio — Protected Admin Create
router.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      client,
      category,
      summary,
      challenge,
      solution,
      results,
      services,
      technologies,
      liveUrl,
      imageUrl,
      featured,
      sortOrder,
    } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        client,
        category,
        summary,
        challenge,
        solution,
        results: Array.isArray(results) ? JSON.stringify(results) : results,
        services: Array.isArray(services) ? JSON.stringify(services) : services,
        technologies: Array.isArray(technologies) ? JSON.stringify(technologies) : technologies,
        liveUrl,
        imageUrl,
        featured: Boolean(featured),
        sortOrder: Number(sortOrder) || 0,
      },
    });

    return res.status(201).json({ success: true, project });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ error: 'Failed to create portfolio project.' });
  }
});

// PUT /api/portfolio/:id — Protected Admin Update
router.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = { ...req.body };

    if (Array.isArray(data.results)) data.results = JSON.stringify(data.results);
    if (Array.isArray(data.services)) data.services = JSON.stringify(data.services);
    if (Array.isArray(data.technologies)) data.technologies = JSON.stringify(data.technologies);

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return res.json({ success: true, project });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ error: 'Failed to update portfolio project.' });
  }
});

// DELETE /api/portfolio/:id — Protected Admin Delete
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.project.delete({ where: { id } });
    return res.json({ success: true, message: 'Project removed.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ error: 'Failed to delete portfolio project.' });
  }
});


export default router;
