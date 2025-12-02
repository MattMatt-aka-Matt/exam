// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const logger = require('./logger');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.set('trust proxy', 1);

// Connexion DB
connectDB();

// 🔒 Sécurité : Headers HTTP
app.use(helmet());

// 🔒 Sécurité : Rate limiting (100 requêtes/15min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, réessayez plus tard.' }
});
app.use('/api/auth', limiter);

// 🔒 Sécurité : CORS restrictif
const corsOptions = {
  origin: [
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 🔒 Sécurité : Sanitization NoSQL
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 🔒 Middleware erreurs global
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message}`);
  res.status(err.status || 500).json({
    error: true,
    message: process.env.NODE_ENV === 'production' 
      ? 'Une erreur est survenue' 
      : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Serveur en écoute sur le port ${PORT}`);
});