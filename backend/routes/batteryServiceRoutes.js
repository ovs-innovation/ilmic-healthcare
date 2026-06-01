const express = require('express');
const router = express.Router();
const ctrl = require('../controller/batteryServiceController');
const { adminOnly } = require('../config/auth');

// Public battery service request submission
router.post('/', ctrl.createRequest);

// Admin-only battery service management
router.get('/dashboard/stats', adminOnly, ctrl.getDashboardStats);
router.get('/', adminOnly, ctrl.getAllRequests);
router.get('/:id', adminOnly, ctrl.getRequestById);
router.put('/:id', adminOnly, ctrl.updateRequest);
router.delete('/:id', adminOnly, ctrl.deleteRequest);

module.exports = router;
