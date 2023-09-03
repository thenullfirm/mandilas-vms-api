const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define access routes
router.post('/login', adminController.login);
router.post('/logout', adminController.logout);

// Define CRUD routes for admins
router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
