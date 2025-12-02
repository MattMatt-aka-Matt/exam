const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'auth-gateway' });
});

app.listen(PORT, () => {
  console.log(`Auth gateway en écoute sur le port ${PORT}`);
});