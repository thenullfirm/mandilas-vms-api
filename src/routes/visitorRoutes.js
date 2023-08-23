const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Define CRUD routes for visitors
router.post('/', visitorController.createVisitor);
router.get('/', visitorController.getAllVisitors);

module.exports = router;
