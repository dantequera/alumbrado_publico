// middleware/auth.middleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenBlacklist = new Set(); // para logout - solo dev. En prod usar Redis.

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  const token = parts[1];

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token invalidado (logout)' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole && req.userRole === 'admin') return next();
  return res.status(403).json({ message: 'Requiere rol admin' });
};

const logoutInvalidateToken = (token) => {
  tokenBlacklist.add(token);
};

module.exports = {
  verifyToken,
  isAdmin,
  logoutInvalidateToken,
  _tokenBlacklist: tokenBlacklist 
};
