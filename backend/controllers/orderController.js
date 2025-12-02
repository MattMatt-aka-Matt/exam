// backend/controllers/orderController.js
const axios = require('axios');
const Order = require('../models/Order');
const orderLog = require('debug')('orderRoutes:console')
const logger = require('../logger');


exports.createOrder = async (req, res) => {
  logger.info(`Création commande - User: ${req.user.userId}`);
  const { items, shippingAddress, paymentMethod, shippingMethod, } = req.body;
  console.log(`items are ${JSON.stringify(req.body)}`)
  let userId = req.user.userId;

  // Vérification du format des données
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: 'Le corps de la requête doit contenir un tableau d\'objets { productId, quantity }.',
    });
  }

  try {
    // Logique pour préparer les détails de la commande
    const orderDetails = items.map(({ productId, quantity, price }) => {
      console.log(`Produit ID : ${productId}, Quantité : ${quantity}, Price ${price}`);
      return { productId, quantity, price };
    });

    // Création de la commande dans la base de données
    const total = items.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );

    const newOrder = new Order({
      userId,
      items: orderDetails,
      total,
      shippingAddress,
      paymentMethod,
      shippingMethod
    });

    // Sauvegarder la commande dans la base de données
    const savedOrder = await newOrder.save();

    const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:8000';
    
    console.log('Commande sauvegardée :', savedOrder);

    // Réponse de succès IMMÉDIATE (avant l'envoi de l'email)
    res.status(201).json({
      message: 'Commande créée avec succès',
      order: savedOrder,
    });

    // Appel ASYNCHRONE au micro-service de notification (ne bloque pas la réponse)
    axios.post(`${GATEWAY_URL}/notify`, {
      to: 'Matthew.domanchin@gmail.com',
      subject: 'Nouvelle Commande Créée',
      text: `Une commande a été créée avec succès pour les produits suivants : \n${orderDetails
        .map((item) => `Produit ID : ${item.productId}, Quantité : ${item.quantity}`)
        .join('\n')}`,
    }).catch(error => {
      console.error('Erreur lors de l\'envoi de la notification', error.message);
    });

  } catch (error) {
    logger.error(`Erreur création commande: ${error.message}`);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la création de la commande.',
    });
  }
};

exports.deleteOrder = async(req, res)=>{
    const { orderId } = req.body;
    console.log(`orderId to delete is ${orderId}`)
}

exports.getOrders = async(req, res)=>{
  const orders = await Order.find();
  res.status(200).json(orders);
}

exports.validateOrder = async (req, res) => {
  const { orderId } = req.body;
  res.status(200).json({message: `Commande ${orderId} validée avec succès.`})
}

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  console.log(`dump console log order id => ${orderId} status = ${status}`);
  try {
    if (!status) {
      return res.status(400).json({ message: "Le statut est requis." });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée." });
    }

    res.status(200).json({ message: "Statut mis à jour avec succès", order });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commande :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};