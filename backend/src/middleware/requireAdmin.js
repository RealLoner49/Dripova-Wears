import { ADMIN_EMAIL } from '../utils/constants.js';

export function requireAdmin(req, res, next) {
  const email = req.headers['x-admin-email'];

  if (!email || email.toLowerCase() !== ADMIN_EMAIL) {
    return res.status(403).json({
      message: 'Admin access only',
    });
  }

  next();
}
