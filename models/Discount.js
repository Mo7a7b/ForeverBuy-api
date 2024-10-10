// models/Discount.js
const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
});

const Discount = mongoose.model('Discounts', discountSchema);
module.exports = Discount;
