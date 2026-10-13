import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { createRateLimiter } from '../middleware/rateLimit.js';
import { sendInquiryNotification, sendClientConfirmation } from '../services/email.js';

const router = Router();

// Rate limiter for public inquiries: max 5 submissions per 10 minutes per IP
const inquiryLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'Inquiry submission limit reached. Please wait a few minutes before submitting another brief.',
});

// POST /api/inquiries — Public lead submission
router.post('/', inquiryLimiter, async (req: Request, res: Response) => {
  try {
    const { name, email, company, service, budget, timeline, description, honeypot } = req.body;

    // Spam honeypot detection: bots fill hidden honeypot fields
    if (honeypot && honeypot.trim().length > 0) {
      console.warn(`🤖 Spam bot trapped via honeypot from IP: ${req.ip}`);
      return res.status(200).json({ success: true, message: 'Inquiry received.' });
    }

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid business email address.' });
    }

    if (!service || typeof service !== 'string') {
      return res.status(400).json({ error: 'Please select a service category.' });
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a brief project description (minimum 10 characters).' });
    }

    // Check duplicate recent submissions within 5 minutes to prevent double-click spam
    const recentDuplicate = await prisma.inquiry.findFirst({
      where: {
        email: email.trim().toLowerCase(),
        description: description.trim(),
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000),
        },
      },
    });

    if (recentDuplicate) {
      return res.status(200).json({
        success: true,
        message: 'Your project inquiry has already been received. Our team will contact you shortly.',
        inquiryId: recentDuplicate.id,
      });
    }

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company ? company.trim() : null,
        service: service.trim(),
        budget: budget ? budget.trim() : null,
        timeline: timeline ? timeline.trim() : null,
        description: description.trim(),
        status: 'NEW',
      },
    });

    // Send asynchronous email notifications (non-blocking)
    sendInquiryNotification(inquiry).catch((err) => console.error('Agency notification error:', err));
    sendClientConfirmation({
      name: inquiry.name,
      email: inquiry.email,
      service: inquiry.service,
    }).catch((err) => console.error('Client acknowledgement error:', err));

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! We will review your brief within 24 hours.',
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error('Error creating project inquiry:', error);
    return res.status(500).json({ error: 'An unexpected server error occurred. Please try again later.' });
  }
});

// GET /api/inquiries — Protected Admin List with Search & Filtering
router.get('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { status, search, page = '1', limit = '20' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status as string;
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
        { company: { contains: q } },
        { service: { contains: q } },
        { description: { contains: q } },
      ];
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.inquiry.count({ where }),
    ]);

    return res.json({
      inquiries,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ error: 'Failed to retrieve project inquiries.' });
  }
});

// PATCH /api/inquiries/:id — Protected Admin Update
router.patch('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status, notes } = req.body;

    const updated = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return res.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return res.status(500).json({ error: 'Failed to update inquiry.' });
  }
});

// DELETE /api/inquiries/:id — Protected Admin Delete
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.inquiry.delete({ where: { id } });
    return res.json({ success: true, message: 'Inquiry record removed.' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});


export default router;
