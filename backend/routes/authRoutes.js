// authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {authenticateToken} = require('../middleware/authMiddleware');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authController.logout);

router.post("/reset", authController.forgotPassword);

router.post("/reset/:resetToken", authController.resetPassword);

router.post("/changed-password", authenticateToken, authController.changePassword);


module.exports = router;
