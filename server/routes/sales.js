const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { generateReceiptText, generateReceiptPDF } = require('../services/receiptService');
const { sendTelegramSale } = require('../services/telegramBot');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { items, paymentMethod, customerName, discount = 0, tax = 0 } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Sotuv uchun mahsulotlar yo\'q' });
    }

    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Mahsulot topilmadi: ${item.productId}` });
      }

      const qty = Number(item.quantity || 1);
      const total = product.price * qty;
      subtotal += total;

      processedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
        total
      });

      product.quantity = Math.max(0, product.quantity - qty);
      await product.save();
    }

    const total = subtotal + tax - discount;

    const sale = await Sale.create({
      items: processedItems,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod,
      customerName
    });

    const receiptText = generateReceiptText(sale);
    const receiptPdf = generateReceiptPDF(sale);

    if (process.env.TELEGRAM_BOT_TOKEN) {
      await sendTelegramSale(receiptText);
    }

    res.status(201).json({ sale, receiptText, receiptPdf });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
