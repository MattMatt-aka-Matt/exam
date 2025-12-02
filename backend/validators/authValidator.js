// backend/validators/authValidator.js
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required()
    .messages({
      'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      'string.max': 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères',
      'any.required': 'Le nom d\'utilisateur est requis'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email invalide',
      'any.required': 'L\'email est requis'
    }),
  password: Joi.string().min(8).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'string.pattern.base': 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre',
      'any.required': 'Le mot de passe est requis'
    })
});

const loginSchema = Joi.object({
  username: Joi.string().required()
    .messages({ 'any.required': 'Le nom d\'utilisateur est requis' }),
  password: Joi.string().required()
    .messages({ 'any.required': 'Le mot de passe est requis' })
});

module.exports = { registerSchema, loginSchema };