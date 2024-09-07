const express = require('express');
const { createQuestion, updateQuestion, deleteQuestion, getAllQuestions, getQuestionById } = require('../controllers/questionController');
const { authenticateToken } = require('../middleware/authMiddleware');
const {isAdmin}  = require('../middleware/authMiddleware');  // If using a separate file

const router = express.Router();

// Public routes
router.get('/questions', getAllQuestions);                  
router.get('/questions/:id', getQuestionById);               

// Admin-only routes
router.post('/questions', authenticateToken, isAdmin, createQuestion);
router.put('/questions/:id', authenticateToken, isAdmin, updateQuestion);
router.delete('/questions/:id', authenticateToken, isAdmin, deleteQuestion);

module.exports = router;
