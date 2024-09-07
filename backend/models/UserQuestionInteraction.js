const mongoose = require('mongoose');

const userQuestionInteractionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question', 
        required: true 
    },
    status: { 
        type: Boolean, 
        default: false 
    },  // True if "ticked" by the user
    revision: { 
        type: Boolean, 
        default: false 
    }   // True if "ticked" by the user
});

const UserQuestionInteraction = mongoose.model('UserQuestionInteraction', userQuestionInteractionSchema);
module.exports = UserQuestionInteraction;