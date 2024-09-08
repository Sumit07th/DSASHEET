import { useRecoilState } from 'recoil';
import { completedQuestionsState, bookmarkedQuestionsState } from '../recoil/atoms/questionAtoms';

function QuestionComponent({ question, isCompleted, isBookmarked }) {
    const [completedQuestions, setCompletedQuestions] = useRecoilState(completedQuestionsState);
    const [bookmarkedQuestions, setBookmarkedQuestions] = useRecoilState(bookmarkedQuestionsState);

    const handleStatusChange = () => {
        const updatedCompleted = isCompleted
            ? completedQuestions.filter(id => id !== question._id)
            : [...completedQuestions, question._id];
        setCompletedQuestions(updatedCompleted);

        // Send update to server (omitted here for brevity)
    };

    const handleBookmarkChange = () => {
        const updatedBookmarks = isBookmarked
            ? bookmarkedQuestions.filter(id => id !== question._id)
            : [...bookmarkedQuestions, question._id];
        setBookmarkedQuestions(updatedBookmarks);

        // Send update to server (omitted here for brevity)
    };

    return (
        <div>
            <h3>{question.title}</h3>
            <label>
                Completed:
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleStatusChange}
                />
            </label>
            <label>
                Bookmarked:
                <input
                    type="checkbox"
                    checked={isBookmarked}
                    onChange={handleBookmarkChange}
                />
            </label>
        </div>
    );
}

export default QuestionComponent;
