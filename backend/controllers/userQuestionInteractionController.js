const UserQuestionInteraction = require('../models/UserQuestionInteraction');

// Update status or revision for a specific question for a user
exports.updateStatusOrRevision = async (req, res) => {
    try {
        const { userId } = req.user;
        const { questionId } = req.params;
        const { status, revision } = req.body;

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

exports.getUserQuestions = async (req, res) => {
    try {
        const userId = req.user._id;
        const questions = await Question.find();

        const interactions = await UserQuestionInteraction.find({ userId }).lean();  // Get user's interactions
        const interactionMap = interactions.reduce((map, interaction) => {
            map[interaction.questionId] = interaction;
            return map;
        }, {});

        // Attach each question with user's personalized status/revision
        const questionsWithUserStatus = questions.map(question => {
            const interaction = interactionMap[question._id.toString()];
            return {
                ...question._doc,
                userStatus: interaction ? interaction.status : false,
                userRevision: interaction ? interaction.revision : false
            };
        });

        res.status(200).json(questionsWithUserStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions.', error });
    }
};
