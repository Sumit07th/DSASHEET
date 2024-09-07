const express = require('express');
const { updateUserInteraction, getUserQuestions } = require('../controllers/userQuestionInteractionController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/interactions/:questionId', authenticateToken, updateUserInteraction);
router.get('/user/questions', authenticateToken, getUserQuestions);

module.exports = router;
