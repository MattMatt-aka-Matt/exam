// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const logger = require('../logger');
require('dotenv').config();

exports.login = async (req, res) => {
  // Validation Joi
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`Connexion réussie: ${username}`);
    res.json({ token, role: user.role, username: user.username });
  } catch (error) {
    logger.error(`Erreur login: ${error.message}`);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.register = async (req, res) => {
  // Validation Joi
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email ou nom d\'utilisateur existe déjà.' });
    }

    const user = new User({ username, email, password });
    await user.save();

    logger.info(`Nouvel utilisateur créé: ${username}`);
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    logger.error(`Erreur inscription: ${error.message}`);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};



exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Supprimer l'utilisateur
    await User.findByIdAndDelete(userId);
    
    // Supprimer ses commandes (optionnel selon RGPD)
    const Order = require('../models/Order');
    await Order.deleteMany({ userId });
    
    logger.info(`Compte supprimé: ${userId}`);
    res.json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    logger.error(`Erreur suppression compte: ${error.message}`);
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};

exports.exportData = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId).select('-password');
    const Order = require('../models/Order');
    const orders = await Order.find({ userId });
    
    res.json({
      user,
      orders,
      exportDate: new Date().toISOString()
    });
  } catch (error) {
    logger.error(`Erreur export données: ${error.message}`);
    res.status(500).json({ message: 'Erreur lors de l\'export' });
  }
};