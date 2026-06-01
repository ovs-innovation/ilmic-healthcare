const express = require('express');
const router = express.Router();

const {
  addAttribute,
  addAllAttributes,
  getAllAttributes,
  getShowingAttributes,
  getAttributeById,
  updateAttributes,
  updateStatus,
  deleteAttribute,
  getShowingAttributesTest,
  updateChildStatus,
  deleteChildAttribute,
  addChildAttributes,
  updateChildAttributes,
  getChildAttributeById,
  updateManyAttribute,
  deleteManyAttribute,
  updateManyChildAttribute,
  deleteManyChildAttribute,
} = require('../controller/attributeController');
const { adminOnly } = require('../config/auth');

// Public storefront reads
router.get('/', getAllAttributes);
router.get('/show', getShowingAttributes);
router.get('/child/:id/:ids', getChildAttributeById);
router.get('/:id', getAttributeById);

// Admin-only attribute management
router.post('/add', adminOnly, addAttribute);
router.post('/add/all', adminOnly, addAllAttributes);
router.put('/add/child/:id', adminOnly, addChildAttributes);
router.put('/show/test', adminOnly, getShowingAttributesTest);
router.patch('/update/many', adminOnly, updateManyAttribute);
router.put('/:id', adminOnly, updateAttributes);
router.patch('/update/child/many', adminOnly, updateManyChildAttribute);
router.put('/update/child/:attributeId/:childId', adminOnly, updateChildAttributes);
router.put('/status/:id', adminOnly, updateStatus);
router.put('/status/child/:id', adminOnly, updateChildStatus);
router.delete('/:id', adminOnly, deleteAttribute);
router.put('/delete/child/:attributeId/:childId', adminOnly, deleteChildAttribute);
router.patch('/delete/many', adminOnly, deleteManyAttribute);
router.patch('/delete/child/many', adminOnly, deleteManyChildAttribute);

module.exports = router;
