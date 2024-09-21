// authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const {sendEmail} = require("../utils/sendEmail");
const { generatePasswordResetToken,ComparePassword } = require("../utils/generateToken");
const {generateToken} = require("../utils/jwtUtils");
const crypto = require('crypto');

// Register a new user

exports.register = async (req, res) => {
    try {
        const { email, password ,name } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);


        // Save the user with the hashed password
        const newUser = new User({ email, password: hashedPassword ,name});
        await newUser.save();

        // Immediately retrieve and log the stored password from the database
        const savedUser = await User.findOne({ email: newUser.email });
        const token = generateToken(savedUser._id);


        res.status(201).json({ message: 'User registered successfully.',
            email: savedUser.email,
            role: savedUser.role,
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user.', error });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }


        // Compare the provided password with the stored hashed password
        const isMatch = await comparePassword(password, user.password);


        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate and return the JWT token
        const token = generateToken(user._id);
        res.status(200).json({
            email: user.email,
            role: user.role,
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error });
    }
};
//Logout user (invalidate the token)
exports.logout = (req, res) => {
    // Invalidate the token on the client side (e.g., remove it from local storage)
    res.status(200).json({ message: 'Logged out successfully.' });
};

/**
 * @FORGOT_PASSWORD
 * @ROUTE @POST {{URL}}/api/user/reset
 * @ACCESS Public
 */

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is Required' });
    }

    const user = await User.findOne({ email });

    if (!user) {

        return res.status(400).json({ message: 'Email not registered' });
    }

    const resetToken = generatePasswordResetToken();
    console.log(resetToken)
    const expiryTime = Date.now() + 15 * 60 * 1000;

    user.forgotPasswordToken = resetToken;
    user.forgotPasswordExpiry = new Date(expiryTime);
    await user.save();
    console.log("saveHo gya");

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href="${resetPasswordUrl}" target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

    console.log("below mail data")
    try {
        await sendEmail(email, subject, message);

        console.log("mail sent")
        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`,
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save();

        return res.status(500).json({ message: 'Something went wrong, please try again.' });
    }
};

/**
 * @RESET_PASSWORD
 * @ROUTE @POST {{URL}}/api/user/reset/:resetToken
 * @ACCESS Public
 */
exports.resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    console.log(resetToken)

    const forgotPasswordToken = resetToken;
    //console.log(forgotPasswordToken)

    if (!password) {
        return res.status(400).json({ message: 'Password is Required' });
    }

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: 'Token is invalid or expired , please try again' });

    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
};


/**
 * @CHANGE_PASSWORD
 * @ROUTE @POST {{URL}}/api/user/change-password
 * @ACCESS Private (Logged in users only)
 */
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({message:'Old password and new password are required'})
    }

    const user = await User.findById(id).select('+password');

    if (!user) {
        return res.status(400).json({message:'Invalid user id or user does not exist'});
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await comparePassword(oldPassword, user.password);

    if (!isMatch) {
        return res.status(400).json({message:'Invalid Old Password'});
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
};