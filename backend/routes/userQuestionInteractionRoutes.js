const express = require('express');
const { updateStatusOrRevision, getUserQuestions,fetchArticleByQuestionId } = require('../controllers/userQuestionInteractionController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Route to update the status or revision of a specific question for a user
router.put('/questions/:questionId/interaction', authenticateToken, updateStatusOrRevision);

// Route to get all questions along with user's status and revision
router.get('/questions', authenticateToken, getUserQuestions);

// Route to get article details by questionId
router.get('/questions/:questionId/article', fetchArticleByQuestionId);

module.exports = router;
