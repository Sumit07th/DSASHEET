const express = require('express');
const { updateStatusOrRevision, getUserQuestions } = require('../controllers/userQuestionInteractionController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/interactions/:questionId', authenticateToken, updateStatusOrRevision);
router.get('/user/questions', authenticateToken, getUserQuestions);

module.exports = router;
