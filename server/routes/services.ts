import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/services — Public list
router.get('/', async (_req: Request, res: Response) => {
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

    return res.json({ services: parsedServices });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ error: 'Failed to retrieve agency services.' });
  }
});

// GET /api/services/:slug — Public service details
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    return res.json({
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
    return res.status(500).json({ error: 'Failed to retrieve service details.' });
  }
});

// PUT /api/services/:id — Protected Admin Update
router.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = { ...req.body };

    if (Array.isArray(data.capabilities)) data.capabilities = JSON.stringify(data.capabilities);
    if (Array.isArray(data.deliverables)) data.deliverables = JSON.stringify(data.deliverables);
    if (Array.isArray(data.process)) data.process = JSON.stringify(data.process);
    if (Array.isArray(data.faqs)) data.faqs = JSON.stringify(data.faqs);

    const updated = await prisma.service.update({
      where: { id },
      data,
    });


    return res.json({ success: true, service: updated });
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ error: 'Failed to update service.' });
  }
});

export default router;
