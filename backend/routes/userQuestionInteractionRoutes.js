const express = require('express');
const {
    updateStatusOrRevision,
    getUserQuestions,
    fetchArticleByQuestionId,
    updateNotes,
    deleteNote,
    fetchUserNotes
} = require('../controllers/userQuestionInteractionController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Route to update the status, revision, or notes of a specific question for a user
router.put('/questions/:questionId/interaction', authenticateToken, updateStatusOrRevision);

// Optional: Route to update notes separately
router.put('/questions/:questionId/notes', authenticateToken, updateNotes);

// Route to get all questions along with user's status, revision, and notes
router.get('/questions', authenticateToken, getUserQuestions);

// Route to get article details by questionId
router.get('/questions/:questionId/article',authenticateToken, fetchArticleByQuestionId);

router.delete('/questions/:questionId/notes',authenticateToken, deleteNote);

router.get('/questions/:questionId/notes',authenticateToken,fetchUserNotes)

module.exports = router;
