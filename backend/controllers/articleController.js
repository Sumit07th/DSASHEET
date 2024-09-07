const Article = require('../models/articleModel');

// Create a new article
exports.createArticle = async (req, res) => {
    try {
        const article = new Article(req.body);
        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
};

// Get an article by ID
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error });
    }
};

// Update an article
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};
