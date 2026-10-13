import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function createRateLimiter(options: { windowMs: number; max: number; message?: string }) {
  const { windowMs, max, message = 'Too many requests. Please try again later.' } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    if (!store[ip] || now > store[ip].resetTime) {
      store[ip] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return next();
    }

    store[ip].count += 1;

    if (store[ip].count > max) {
      const retryAfter = Math.ceil((store[ip].resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        error: message,
        retryAfterSeconds: retryAfter,
      });
    }

    next();
  };
}

// Cleanup stale rate limit items every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const ip in store) {
    if (now > store[ip].resetTime) {
      delete store[ip];
    }
  }
}, 15 * 60 * 1000);
