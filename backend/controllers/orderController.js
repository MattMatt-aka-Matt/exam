// backend/controllers/orderController.js
const axios = require('axios');
const Order = require('../models/Order');
const logger = require('../logger');

/**
 * Crée une nouvelle commande pour l'utilisateur connecté
 * @async
 * @function createOrder
 * @param {Object} req - Requête Express
 * @param {Object} req.body - Corps de la requête
 * @param {Array} req.body.items - Liste des produits [{productId, quantity, price}]
 * @param {Object} req.body.shippingAddress - Adresse de livraison
 * @param {string} req.body.paymentMethod - Méthode de paiement
 * @param {string} req.body.shippingMethod - Méthode de livraison
 * @param {Object} res - Réponse Express
 * @returns {Object} Commande créée
 */
exports.createOrder = async (req, res) => {
  logger.info(`Création commande - User: ${req.user.userId}`);
  const { items, shippingAddress, paymentMethod, shippingMethod } = req.body;
  const userId = req.user.userId;

  // Validation du format des données
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: 'Le corps de la requête doit contenir un tableau d\'objets { productId, quantity }.',
    });
  }

  try {
    // Préparation des détails de la commande
    const orderDetails = items.map(({ productId, quantity, price }) => {
      return { productId, quantity, price };
    });

    // Calcul du total
    const total = items.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );

    // Création de l'objet commande
    const newOrder = new Order({
      userId,
      items: orderDetails,
      total,
      shippingAddress,
      paymentMethod,
      shippingMethod
    });

    // Sauvegarde en base de données
    const savedOrder = await newOrder.save();

    // Réponse immédiate au client (ne pas bloquer)
    res.status(201).json({
      message: 'Commande créée avec succès',
      order: savedOrder,
    });

    // Envoi asynchrone de la notification (ne bloque pas la réponse)
    const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:8000';
    axios.post(`${GATEWAY_URL}/notify`, {
      to: 'client@example.com',
      subject: 'Nouvelle Commande Créée',
      text: `Votre commande a été créée avec succès.`,
    }).catch(error => {
      // Log l'erreur mais ne fait pas échouer la commande
      logger.error(`Erreur notification: ${error.message}`);
    });

  } catch (error) {
    logger.error(`Erreur création commande: ${error.message}`);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la création de la commande.',
    });
  }
};

/**
 * Récupère toutes les commandes (admin)
 * @async
 * @function getOrders
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Array} Liste des commandes
 */
exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
};

/**
 * Met à jour le statut d'une commande
 * @async
 * @function updateOrderStatus
 * @param {Object} req - Requête Express
 * @param {string} req.params.orderId - ID de la commande
 * @param {string} req.body.status - Nouveau statut
 * @param {Object} res - Réponse Express
 * @returns {Object} Commande mise à jour
 */
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  // ... logique de mise à jour
};