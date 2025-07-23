const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

function extractMinTransaction(summary) {
  const match = summary.match(/Min(?:imum)? Txn(?: Value)?: ?₹?([\d,]+)/i);
  return match ? parseInt(match[1].replace(/,/g, '')) : 0;
}

function extractMaxDiscount(summary) {
  const match = summary.match(/up to ?₹?([\d,]+)/i);
  return match ? parseInt(match[1].replace(/,/g, '')) : 0;
}
// POST /offer - Save offers from Flipkart payload
router.post('/offer', async (req, res) => {
  try {
    const offers = req.body.offer_sections?.PBO?.offers || [];
    const no_of_offers_identified = offers.length;
    let no_of_offers_saved = 0;

    for (const offer of offers) {
      const exists = await Offer.findOne({ adjustment_id: offer.adjustment_id });
      if (!exists) {
        const newOffer = new Offer({
          adjustment_id: offer.adjustment_id,
          adjustment_type: offer.adjustment_type,
          summary: offer.summary,
          banks: offer.contributors?.banks||[],
          payment_method: offer.contributors?.payment_instrument||[],
          min_transaction: extractMinTransaction(offer.summary),
          max_discount: extractMaxDiscount(offer.summary),
          emi_months: offer.contributors?.emi_months
        });

        await newOffer.save();
        no_of_offers_saved++;
      }
    }

    return res.status(200).json({
      message: 'Offers processed',
      no_of_offers_identified,
      no_of_offers_saved
    });
  } catch (err) {
    console.error('Error saving offers:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /highest-discount?bankName=XYZ&amountToPay=1234
router.get('/highest-discount', async (req, res) => {
  try {
    const { bankName, amountToPay, paymentMethod } = req.query;

    if (!bankName || !amountToPay || !paymentMethod) {
      return res.status(400).json({ message: 'bankName, amountToPay, and paymentMethod are required' });
    }

    const offers = await Offer.find({
      banks: bankName,
      payment_method: paymentMethod,
      min_transaction: { $lte: Number(amountToPay) }
    }).sort({ max_discount: -1 });

    if (offers.length === 0) {
      return res.status(404).json({ message: 'No valid offer found.' });
    }

    return res.status(200).json({ best_offer: offers[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
