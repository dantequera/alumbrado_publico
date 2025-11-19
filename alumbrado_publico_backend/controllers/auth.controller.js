// controllers/auth.controller.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { logoutInvalidateToken } = require('../middleware/auth.middleware');

const User = db.User;

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email y password son obligatorios' });
    }

    // Verificar existencia por username o email
    const existUser = await User.findOne({
      where: db.Sequelize.or(
        { username },
        { email }
      )
    });

    if (existUser) {
      return res.status(409).json({ message: 'Username o email ya en uso' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashed,
      role: role || 'user'
    });

    // No devolver password
    const userSafe = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt
    };

    return res.status(201).json({ message: 'Usuario creado', user: userSafe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username y password son obligatorios' });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    return res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno', error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return res.status(400).json({ message: 'No se encontró token en la cabecera' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(400).json({ message: 'Formato de cabecera inválido' });

    const token = parts[1];
    logoutInvalidateToken(token);
    return res.json({ message: 'Logout exitoso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno', error: err.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno', error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  profile
};
