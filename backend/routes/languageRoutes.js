const express = require('express');
const router = express.Router();

const {
  addLanguage,
  addAllLanguage,
  getAllLanguages,
  getShowingLanguage,
  getLanguageById,
  updateLanguage,
  updateStatus,
  deleteLanguage,
  updateManyLanguage,
  deleteManyLanguage,
} = require('../controller/languageController');
const { adminOnly } = require('../config/auth');

// Public storefront read
router.get('/show', getShowingLanguage);

// Admin-only language management
router.post('/add', adminOnly, addLanguage);
router.post('/add/all', adminOnly, addAllLanguage);
router.get('/all', adminOnly, getAllLanguages);
router.get('/:id', adminOnly, getLanguageById);
router.put('/:id', adminOnly, updateLanguage);
router.patch('/update/many', adminOnly, updateManyLanguage);
router.put('/status/:id', adminOnly, updateStatus);
router.patch('/:id', adminOnly, deleteLanguage);
router.patch('/delete/many', adminOnly, deleteManyLanguage);

module.exports = router;
