const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  cost: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  barcode: { type: String, unique: true, sparse: true },
  qrCode: String,
  category: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
