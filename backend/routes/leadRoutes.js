const express = require('express');
const router = express.Router();
const leadController = require('../controller/leadController');
const { adminOnly, isAuth, ensureSelfOrAdmin } = require('../config/auth');

// Public lead submission
router.post('/', leadController.createLead);

// Customer can view own leads
router.get('/user/:userId', isAuth, ensureSelfOrAdmin, leadController.getUserLeads);

// Admin-only lead management
router.get('/', adminOnly, leadController.getLeads);
router.get('/dashboard/count', adminOnly, leadController.getDashboardCount);
router.get('/dashboard/recent', adminOnly, leadController.getDashboardRecentLeads);
router.get('/dashboard/data', adminOnly, leadController.getDashboardLeadData);
router.post('/bulk-delete', adminOnly, leadController.bulkDeleteLeads);
router.post('/bulk-status', adminOnly, leadController.bulkStatusUpdate);
router.get('/:id', adminOnly, leadController.getLeadById);
router.put('/:id', adminOnly, leadController.updateLead);
router.delete('/:id', adminOnly, leadController.deleteLead);

module.exports = router;
