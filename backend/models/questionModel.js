const mongoose = require('mongoose');

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
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Article',
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
        type: String,   // Easy, Medium, or Hard
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    createdAt: {
        type: Date,     
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', questionSchema);
