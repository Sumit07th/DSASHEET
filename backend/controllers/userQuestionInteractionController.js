const UserQuestionInteraction = require('../models/UserQuestionInteraction');
const Question = require('../models/questionModel');  // Ensure this is imported

// Update status or revision for a specific question for a user
exports.updateStatusOrRevision = async (req, res) => {
    try {
        const userId = req.user._id;  // Ensure consistency with getUserQuestions
        const { questionId } = req.params;
        const { status, revision } = req.body;

        // Validate input (ensure questionId, status, and revision are provided)
        if (!questionId || (status === undefined && revision === undefined)) {
            return res.status(400).json({ message: 'Missing required fields: questionId, status, or revision' });
        }

        // Find the interaction or create a new one
        const interaction = await UserQuestionInteraction.findOneAndUpdate(
            { userId, questionId },
            { status, revision },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Status and revision updated.', interaction });
    } catch (error) {
        console.error('Error updating status/revision:', error);
        res.status(500).json({ message: 'Error updating status/revision.', error });
    }
};

// Get all questions and user's status/revision
exports.getUserQuestions = async (req, res) => {
    try {
        const userId = req.user._id;  // Consistency in userId retrieval

        // Fetch all questions
        const questions = await Question.find();

        // Fetch the user's interactions (status and revision)
        const interactions = await UserQuestionInteraction.find({ userId }).lean();

        // Create a map of interactions for easier lookup
        const interactionMap = interactions.reduce((map, interaction) => {
            map[interaction.questionId] = interaction;
            return map;
        }, {});

        // Attach each question with user's personalized status/revision
        const questionsWithUserStatus = questions.map(question => {
            const interaction = interactionMap[question._id.toString()];
            return {
                ...question._doc,  // Use Mongoose document data
                userStatus: interaction ? interaction.status : false,
                userRevision: interaction ? interaction.revision : false
            };
        });

        res.status(200).json(questionsWithUserStatus);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions.', error });
    }
};

// Fetch article details by questionId
exports.fetchArticleByQuestionId = async (req, res) => {
    try {
        const { questionId } = req.params;

        // Validate questionId
        if (!questionId) {
            return res.status(400).json({ message: 'Question ID is required' });
        }

        // Find the question by ID and populate the article field
        const question = await Question.findById(questionId).select('article');

        // Check if the question exists
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json(question.article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Error fetching article.', error });
    }
};
