// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification - Vérifie le token JWT
 * @function authenticateToken
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next d'Express
 * @returns {void}
 */
exports.authenticateToken = (req, res, next) => {
  // Extraction du token depuis le header Authorization
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401); // Non authentifié
  }

  try {
    // Vérification et décodage du token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: true, message: 'Token invalide' });
      }
      // Ajout des infos utilisateur à la requête
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(403).json({ error: true, message: 'Token invalide' });
  }
};

/**
 * Middleware de vérification du rôle admin
 * @function isAdmin
 * @param {Object} req - Requête Express (avec user authentifié)
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next d'Express
 * @returns {void}
 */
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit' });
  }
  next();
};