import userAxiosInstance from '../utils/axiosInstance';

// Fetch all questions with user's status and revision
export const fetchUserQuestions = async () => {
    try {
        const response = await userAxiosInstance.get('/user/questions');
        return response.data;  // Returns questions with status and revision
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred while fetching user questions.');
        }
    }
};

// Update status or revision for a specific question
export const updateUserQuestionStatusOrRevision = async (questionId, status, revision) => {
    try {
        const response = await userAxiosInstance.put(`/user/questions/${questionId}/interaction`, {
            status,
            revision,
        });
        return response.data;  // Returns the updated interaction
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred while updating question interaction.');
        }
    }
};

// Fetch article by questionId
export const fetchArticle = async (questionId) => {
    try {
        const response = await userAxiosInstance.get(`/user/questions/${questionId}/article`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred while fetching the article.');
        }
    }
};
