const Question = require('../models/questionModel');


// Create a new question (Admin Only)
exports.createQuestion = async (req, res) => {
    try {
        const { topic,status, question, article, videoLink, platformLink, notes, difficulty, revision } = req.body;

        
        // Create a new question instance
        const newQuestion = new Question({
            topic,
            status,
            question,
            article,
            videoLink,
            platformLink,
            notes,
            difficulty,
            revision
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
        const { id } = req.params;  // Get the question ID from params
        const updates = req.body;   // Get the fields to be updated from the request body

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

// Delete a question (Admin Only)
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;  // Get the question ID from params

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
