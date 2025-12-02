// backend/routes/authRoutes.js
const express = require('express');
const { login, register, deleteAccount, exportData } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.delete('/delete-account', authenticateToken, deleteAccount);
router.get('/export-data', authenticateToken, exportData);

module.exports = router;