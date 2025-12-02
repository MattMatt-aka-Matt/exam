// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const logger = require('../logger');
require('dotenv').config();

/**
 * Authentifie un utilisateur et retourne un token JWT
 * @async
 * @function login
 * @param {Object} req - Requête Express
 * @param {Object} req.body - Corps de la requête
 * @param {string} req.body.username - Nom d'utilisateur
 * @param {string} req.body.password - Mot de passe
 * @param {Object} res - Réponse Express
 * @returns {Object} Token JWT, rôle et username en cas de succès
 */
exports.login = async (req, res) => {
  // Validation des données avec Joi
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password } = req.body;

  try {
    // Recherche de l'utilisateur en base
    const user = await User.findOne({ username });
    if (!user) {
      // Message générique pour éviter l'énumération d'utilisateurs
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }

    // Vérification du mot de passe hashé
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }

    // Génération du token JWT (expire dans 1h)
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

/**
 * Inscrit un nouvel utilisateur
 * @async
 * @function register
 * @param {Object} req - Requête Express
 * @param {Object} req.body - Corps de la requête
 * @param {string} req.body.username - Nom d'utilisateur (3-30 caractères)
 * @param {string} req.body.email - Adresse email valide
 * @param {string} req.body.password - Mot de passe (min 8 car., 1 maj, 1 min, 1 chiffre)
 * @param {Object} res - Réponse Express
 * @returns {Object} Message de confirmation
 */
exports.register = async (req, res) => {
  // Validation des données avec Joi
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, email, password } = req.body;

  try {
    // Vérification que l'email ET le username n'existent pas déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email ou nom d\'utilisateur existe déjà.' });
    }

    // Création et sauvegarde du nouvel utilisateur
    const user = new User({ username, email, password });
    await user.save();

    logger.info(`Nouvel utilisateur créé: ${username}`);
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    logger.error(`Erreur inscription: ${error.message}`);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

/**
 * Supprime le compte de l'utilisateur connecté (RGPD - droit à l'effacement)
 * @async
 * @function deleteAccount
 * @param {Object} req - Requête Express (avec user authentifié)
 * @param {Object} res - Réponse Express
 * @returns {Object} Message de confirmation
 */
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Suppression de l'utilisateur
    await User.findByIdAndDelete(userId);
    
    // Suppression des commandes associées
    const Order = require('../models/Order');
    await Order.deleteMany({ userId });
    
    logger.info(`Compte supprimé: ${userId}`);
    res.json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    logger.error(`Erreur suppression compte: ${error.message}`);
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};

/**
 * Exporte les données personnelles de l'utilisateur (RGPD - droit à la portabilité)
 * @async
 * @function exportData
 * @param {Object} req - Requête Express (avec user authentifié)
 * @param {Object} res - Réponse Express
 * @returns {Object} Données utilisateur et commandes
 */
exports.exportData = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Récupération des données sans le mot de passe
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