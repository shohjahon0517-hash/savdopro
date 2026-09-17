require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { initializeTelegramBot } = require('./services/telegramBot');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
initializeTelegramBot();

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Savdo Pro ishlayapti' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/sales', salesRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlayapti`);
});
