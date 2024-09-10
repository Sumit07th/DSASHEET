import adminAxiosInstance from '../utils/adminAxiosInstance';

// Create a new question
export const createQuestion = async (questionData) => {
    try {
        const response = await adminAxiosInstance.post('/admin/questions', questionData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

// Fetch all questions
export const fetchQuestions = async () => {
    try {
        const response = await adminAxiosInstance.get('/admin/questions');
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

// Update a question
export const updateQuestion = async (id, updatedData) => {
    try {
        const response = await adminAxiosInstance.put(`/admin/questions/${id}`, updatedData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

// Delete a question
export const deleteQuestion = async (id) => {
    try {
        const response = await adminAxiosInstance.delete(`/admin/questions/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};
