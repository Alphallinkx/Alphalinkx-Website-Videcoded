import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/testimonials — Public list
router.get('/', async (_req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return res.status(500).json({ error: 'Failed to retrieve testimonials.' });
  }
});

// POST /api/testimonials — Protected Admin Create
router.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { clientName, role, company, quote, rating, project, avatarUrl, featured } = req.body;
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
    return res.status(201).json({ success: true, testimonial });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return res.status(500).json({ error: 'Failed to create testimonial.' });
  }
});

// DELETE /api/testimonials/:id — Protected Admin Delete
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.testimonial.delete({ where: { id } });
    return res.json({ success: true, message: 'Testimonial removed.' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return res.status(500).json({ error: 'Failed to delete testimonial.' });
  }
});


export default router;
