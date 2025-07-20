// server/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.error('❌ No token found in request');
    return res.status(401).json({ msg: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId); // ✅ fixed key

    if (!req.user) {
      console.error('❌ User not found for token');
      return res.status(404).json({ msg: 'User not found' });
    }

    console.log('✅ Authenticated user:', req.user.email);
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ msg: 'Not authorized: token invalid' });
  }
};
