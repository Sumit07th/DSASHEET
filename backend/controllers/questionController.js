const Question = require('../models/questionModel');

// Create a new question (Admin Only)
exports.createQuestion = async (req, res) => {
    try {
        const { topic, question, article, videoLink, platformLink, difficulty } = req.body;

        // Create a new question instance
        const newQuestion = new Question({
            topic,
            question,
            article, // This should be an object matching the articleSchema
            videoLink,
            platformLink,
            difficulty
        });

        // Save the question to the database
        await newQuestion.save();

        res.status(201).json({ message: 'Question created successfully.', question: newQuestion });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Error creating question.', error });
    }
};

// Update a question (Admin Only)
exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find the question by ID and update it
        const updatedQuestion = await Question.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        res.status(200).json({ message: 'Question updated successfully.', question: updatedQuestion });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ message: 'Error updating question.', error });
    }
};

// Add a solution to an article
exports.addSolutionToArticle = async (req, res) => {
    try {
        const { id } = req.params; // ID of the question
        const { approach, code } = req.body; // New solution data

        // Find the question by ID
        const question = await Question.findById(id);

        if (!question || !question.article) {
            return res.status(404).json({ message: 'Question or article not found.' });
        }

        // Add new solution to article's solutions array
        question.article.solutions.push({ approach, code });

        // Save the updated question
        await question.save();

        res.status(200).json({ message: 'Solution added successfully.', question });
    } catch (error) {
        console.error('Error adding solution:', error);
        res.status(500).json({ message: 'Error adding solution.', error });
    }
};

// Delete a solution from an article
exports.deleteSolutionFromArticle = async (req, res) => {
    try {
        const { id, solutionId } = req.params; // ID of the question and solution

        // Find the question by ID
        const question = await Question.findById(id);

        if (!question || !question.article) {
            return res.status(404).json({ message: 'Question or article not found.' });
        }

        // Check if there are enough solutions before deletion
        if (question.article.solutions.length <= 1) {
            return res.status(400).json({ message: 'Cannot delete solution; at least one solution is required.' });
        }

        // Remove the solution from article's solutions array
        question.article.solutions = question.article.solutions.filter(solution => solution._id.toString() !== solutionId);

        // Save the updated question
        await question.save();

        res.status(200).json({ message: 'Solution deleted successfully.', question });
    } catch (error) {
        console.error('Error deleting solution:', error);
        res.status(500).json({ message: 'Error deleting solution.', error });
    }
};


// Delete a question (Admin Only)
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the question by ID and delete it
        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        res.status(200).json({ message: 'Question deleted successfully.' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ message: 'Error deleting question.', error });
    }
};

// Get all questions (Accessible to all users)
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions.', error });
    }
};

// Get a single question by ID (Accessible to all users)
exports.getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error('Error fetching question:', error);
        res.status(500).json({ message: 'Error fetching question.', error });
    }
};
