const mongoose = require('mongoose');

// Define solution schema
const solutionSchema = new mongoose.Schema({
    approach: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

// Define article schema
const articleSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    problemStatement: {
        type: String,
        required: true
    },
    example: {
        type: String
    },
    solutions: {
        type: [solutionSchema],
        validate: [arrayLimit, 'Solutions should be between 1 and 3']
    }
});

// Custom validator for solutions array length
function arrayLimit(val) {
    return val.length >= 1 && val.length <= 3;
}

// Define question schema with embedded article schema
const questionSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    article: {
        type: articleSchema,
        required: true
    },
    videoLink: {
        type: String,
        required: false
    },
    platformLink: {
        type: String,
        required: false
    },
    difficulty: {
        type: String, // Easy, Medium, or Hard
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
