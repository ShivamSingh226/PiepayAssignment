const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  adjustment_id: String,
  adjustment_type: String, // e.g., "INSTANT_DISCOUNT", "CASHBACK_ON_CARD"
  summary: String,
  banks: [String],
  payment_method: [String], // e.g., "CREDIT", "EMI_OPTIONS", "UPI_INTENT"
  min_transaction: Number,  // extracted from summary if needed
  max_discount: Number,     // extracted from summary if needed
  emi_months: [String]
}, {
  timestamps: true // automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Offer', OfferSchema);
