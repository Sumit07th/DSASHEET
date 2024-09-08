import { selector } from 'recoil';
import { questionsState, completedQuestionsState, bookmarkedQuestionsState } from '../atoms/questionAtoms';

// Selector to get only completed questions
export const completedQuestionsSelector = selector({
    key: 'completedQuestionsSelector',
    get: ({ get }) => {
        const questions = get(questionsState);
        const completedQuestionIds = get(completedQuestionsState);
        // Return only completed questions
        return questions.filter(question => completedQuestionIds.includes(question._id));
    },
});

// Selector to get only bookmarked questions
export const bookmarkedQuestionsSelector = selector({
    key: 'bookmarkedQuestionsSelector',
    get: ({ get }) => {
        const questions = get(questionsState);
        const bookmarkedQuestionIds = get(bookmarkedQuestionsState);
        // Return only bookmarked questions
        return questions.filter(question => bookmarkedQuestionIds.includes(question._id));
    },
});

// Selector to get a question by ID
export const questionByIdSelector = selector({
    key: 'questionByIdSelector',
    get: ({ get }) => {
        const questions = get(questionsState);
        return (questionId) => questions.find(question => question._id === questionId);
    },
});
