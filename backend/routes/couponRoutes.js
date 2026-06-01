const express = require('express');
const router = express.Router();
const {
  addCoupon,
  addAllCoupon,
  getAllCoupons,
  getShowingCoupons,
  getCouponById,
  updateCoupon,
  updateStatus,
  deleteCoupon,
  updateManyCoupons,
  deleteManyCoupons,
} = require('../controller/couponController');
const { adminOnly } = require('../config/auth');

// Public storefront read
router.get('/show', getShowingCoupons);

// Admin-only coupon management
router.post('/add', adminOnly, addCoupon);
router.post('/add/all', adminOnly, addAllCoupon);
router.get('/', adminOnly, getAllCoupons);
router.get('/:id', adminOnly, getCouponById);
router.put('/:id', adminOnly, updateCoupon);
router.patch('/update/many', adminOnly, updateManyCoupons);
router.put('/status/:id', adminOnly, updateStatus);
router.delete('/:id', adminOnly, deleteCoupon);
router.patch('/delete/many', adminOnly, deleteManyCoupons);

module.exports = router;
