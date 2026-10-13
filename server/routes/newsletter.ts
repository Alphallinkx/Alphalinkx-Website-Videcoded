import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { createRateLimiter } from '../middleware/rateLimit.js';

const router = Router();

const newsletterLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Subscription rate limit reached. Please try again later.',
});

// POST /api/newsletter — Public subscription
router.post('/', newsletterLimiter, async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to Alphalinkx intelligence briefs!',
      });
    }

    await prisma.newsletterSubscriber.create({
      data: { email: cleanEmail },
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to Alphalinkx executive tech updates.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ error: 'Failed to process subscription.' });
  }
});

// GET /api/newsletter — Protected Admin List
router.get('/', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });
    return res.json({ subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ error: 'Failed to retrieve subscribers.' });
  }
});

export default router;
