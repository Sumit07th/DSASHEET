import { atom } from 'recoil';

// Stores all questions
export const questionsState = atom({
    key: 'questionsState',
    default: [],  // Initial empty array for questions
});

// Stores completed question IDs
export const completedQuestionsState = atom({
    key: 'completedQuestionsState',
    default: [],  // Initial empty array for completed question IDs
});

// Stores bookmarked question IDs
export const bookmarkedQuestionsState = atom({
    key: 'bookmarkedQuestionsState',
    default: [],  // Initial empty array for bookmarked question IDs
});
