import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'alphalinkx_super_secret_jwt_key_2026_futuristic_agency';

export interface AdminPayload {
  userId: string;
  email: string;
  role: string;
  name?: string;
}

export function verifyAdminToken(request: NextRequest): AdminPayload | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}
