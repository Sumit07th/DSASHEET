// function to fetch questions
export const fetchQuestions = async () => {
    const response = await fetch('/api/questions');
    return await response.json();
};

// Fetch the completed questions
export const fetchCompletedQuestions = async () => {
    const response = await fetch('/api/completed-questions');
    return await response.json();
};

// Fetch the bookmarked questions
export const fetchBookmarkedQuestions = async () => {
    const response = await fetch('/api/bookmarked-questions');
    return await response.json();
};
