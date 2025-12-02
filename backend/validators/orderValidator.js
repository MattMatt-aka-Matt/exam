// backend/validators/orderValidator.js
const Joi = require('joi');

const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().positive().required()
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().pattern(/^[0-9]{5}$/).required(),
    country: Joi.string().required()
  }).required(),
  paymentMethod: Joi.string().valid('PayPal', 'Stripe', 'Card').required(),
  shippingMethod: Joi.string().required()
});

module.exports = { orderSchema };