const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topic: {
        type: String,   
        required: true
    },
    status: {
        type: Boolean,  
        default: false
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
    notes: {
        type: String,   
        required: false
    },
    difficulty: {
        type: String,   // Easy, Medium, or Hard
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    revision: {
        type: Boolean,  
        default: false
    },
    createdAt: {
        type: Date,     
        default: Date.now
    },
    updatedAt: {
        type: Date,     // Timestamp of the last update to the question
        default: Date.now
    }
});

module.exports = mongoose.model('Question', questionSchema);
