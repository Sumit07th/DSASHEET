const express = require('express');
const router = express.Router();
const { createArticle, getArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Create a new article
router.post('/articles', authenticateToken, isAdmin, createArticle);

// Get an article by ID
router.get('/articles/:id', authenticateToken, getArticle);

// Update an article
router.put('/articles/:id', authenticateToken, isAdmin, updateArticle);

// Delete an article
router.delete('/articles/:id', authenticateToken, isAdmin, deleteArticle);

module.exports = router;
