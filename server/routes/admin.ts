import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { authenticateAdmin, AuthRequest } from '../middleware/auth.js';
import { createRateLimiter } from '../middleware/rateLimit.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'alphalinkx_super_secret_jwt_key_2026_futuristic_agency';

// Bruteforce protection for admin login: max 8 attempts per 15 mins
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: 'Too many authentication attempts. Please wait 15 minutes before trying again.',
});

// POST /api/admin/login
router.post('/login', loginLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both email and password.' });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password credentials.' });
    }

    const token = jwt.sign(
      {
        userId: admin.id,
        email: admin.email,
        role: admin.role,
        name: admin.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Authentication service encountered an error.' });
  }
});

// GET /api/admin/me
router.get('/me', authenticateAdmin, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    const user = await prisma.adminUser.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify admin session.' });
  }
});

// GET /api/admin/stats
router.get('/stats', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const [totalInquiries, newInquiries, totalProjects, totalSubscribers, totalServices] =
      await Promise.all([
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: 'NEW' } }),
        prisma.project.count(),
        prisma.newsletterSubscriber.count(),
        prisma.service.count(),
      ]);

    // Calculate inquiries by service
    const rawServices = await prisma.inquiry.groupBy({
      by: ['service'],
      _count: { service: true },
    });

    return res.json({
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
    console.error('Error fetching admin statistics:', error);
    return res.status(500).json({ error: 'Failed to retrieve system statistics.' });
  }
});

// GET /api/admin/settings
router.get('/settings', async (_req: Request, res: Response) => {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
    return res.json({ settings: settingsMap });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve site settings.' });
  }
});

// PUT /api/admin/settings
router.put('/settings', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const updates: Record<string, string> = req.body;
    for (const [key, value] of Object.entries(updates)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }
    return res.json({ success: true, message: 'Settings updated successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save settings.' });
  }
});

export default router;
