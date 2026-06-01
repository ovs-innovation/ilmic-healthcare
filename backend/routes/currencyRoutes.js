const express = require('express');
const router = express.Router();

const {
  addCurrency,
  addAllCurrency,
  getAllCurrency,
  getShowingCurrency,
  getCurrencyById,
  updateCurrency,
  updateManyCurrency,
  updateEnabledStatus,
  updateLiveExchangeRateStatus,
  deleteCurrency,
  deleteManyCurrency,
} = require('../controller/currencyController');
const { adminOnly } = require('../config/auth');

// Public storefront read
router.get('/show', getShowingCurrency);

// Admin-only currency management
router.post('/add', adminOnly, addCurrency);
router.post('/add/all', adminOnly, addAllCurrency);
router.get('/', adminOnly, getAllCurrency);
router.get('/:id', adminOnly, getCurrencyById);
router.put('/:id', adminOnly, updateCurrency);
router.patch('/update/many', adminOnly, updateManyCurrency);
router.patch('/delete/many', adminOnly, deleteManyCurrency);
router.delete('/:id', adminOnly, deleteCurrency);
router.put('/status/enabled/:id', adminOnly, updateEnabledStatus);
router.put('/status/live-exchange-rates/:id', adminOnly, updateLiveExchangeRateStatus);

module.exports = router;
