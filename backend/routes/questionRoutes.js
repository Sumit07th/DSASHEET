const express = require('express');
const {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestions,
    getQuestionById,
    addSolutionToArticle,
    deleteSolutionFromArticle
} = require('../controllers/questionController');
const { authenticateToken } = require('../middleware/authMiddleware');
const {isAdmin}  = require('../middleware/authMiddleware'); // If using a separate file
const {
    updateUserInteraction,
    getUserQuestions
} = require('../controllers/userQuestionInteractionController');

const router = express.Router();

// Public routes
router.get('/questions', getAllQuestions);                  
router.get('/questions/:id', getQuestionById);

// Admin-only routes
router.post('/questions', authenticateToken, isAdmin, createQuestion);
router.put('/questions/:id', authenticateToken, isAdmin, updateQuestion);
router.delete('/questions/:id', authenticateToken, isAdmin, deleteQuestion);
// Add solution to an article
router.post('/questions/:id/solutions', authenticateToken, isAdmin,addSolutionToArticle);
// Route for deleting a solution from an article
router.delete('/questions/:id/solutions/:solutionId',authenticateToken, isAdmin, deleteSolutionFromArticle);



module.exports = router;
