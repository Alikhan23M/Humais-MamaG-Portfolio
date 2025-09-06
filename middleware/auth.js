import { verifyToken } from '../lib/auth';

export function authMiddleware(req, res, next) {
  const token = req.cookies.adminToken || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  req.user = decoded;
  next();
}