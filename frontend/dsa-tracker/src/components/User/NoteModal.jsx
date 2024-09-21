import React, {useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {themeState} from "../../recoil/atoms/themeAtom.js";

const NoteModal = ({ modalVisible, noteText, setNoteText, handleNoteSave, handleNoteDelete, setModalVisible, editingNote }) => {

    const theme = useRecoilValue(themeState);

    // Apply dark mode class to the <html> element based on the theme state
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-black dark:text-white dark:bg-opacity-50">
                <div className="border-4 bg-white p-6 rounded-lg shadow-lg w-80 dark:bg-black dark:text-white dark:border-white">
                    <h2 className="text-xl font-bold mb-4 dark:bg-black dark:text-white">{editingNote ? 'Edit Note' : 'Add Note'}</h2>
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4 dark:bg-black dark:text-white"
                        placeholder="Enter your notes here..."
                    />
                    <div className="flex justify-between dark:bg-black dark:text-white">
                        <button
                            onClick={handleNoteSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                        {editingNote && (
                            <button
                                onClick={handleNoteDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        )}
                        <button
                            onClick={() => setModalVisible(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default NoteModal;
