import React from 'react';

const NoteModal = ({ modalVisible, noteText, setNoteText, handleNoteSave, handleNoteDelete, setModalVisible, editingNote }) => {
    return (
        modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-xl font-bold mb-4">{editingNote ? 'Edit Note' : 'Add Note'}</h2>
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Enter your notes here..."
                    />
                    <div className="flex justify-between">
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
