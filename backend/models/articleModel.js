const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    approach: String,
    code: String
});

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

function arrayLimit(val) {
    return val.length >= 1 && val.length <= 3;
}

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
