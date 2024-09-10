const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/config');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role }, // Include role in the payload
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );
};

// Verify JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token.');
    }
};

module.exports = { generateToken, verifyToken };
