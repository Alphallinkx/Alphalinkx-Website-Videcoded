import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import inquiriesRouter from './routes/inquiries.js';
import portfolioRouter from './routes/portfolio.js';
import servicesRouter from './routes/services.js';
import testimonialsRouter from './routes/testimonials.js';
import newsletterRouter from './routes/newsletter.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    agency: 'Alphalinkx Digital Agency',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Route Registrations
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/services', servicesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/admin', adminRouter);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal server error occurred.',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ Alphalinkx Agency Engine running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints live at http://localhost:${PORT}/api`);
  console.log(`======================================================\n`);
});
