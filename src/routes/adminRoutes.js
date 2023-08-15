const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define routes
router.post('/login', adminController.login);

// Define CRUD routes for admins
router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
