const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// Create a new CV
router.post('/create', cvController.createCV);

// Get all CVs
router.get('/all', cvController.getAllCVs);

// Get a specific CV by ID
router.get('/:id', cvController.getCVById);

// Update a CV by ID
router.put('/update/:id', cvController.updateCV);

// Delete a CV by ID
router.delete('/delete/:id', cvController.deleteCV);

module.exports = router;
