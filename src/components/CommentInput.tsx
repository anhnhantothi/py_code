import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

interface CommentInputProps {
    handleCommentSubmit: (e: string) => void;
}

const CommentInputBox: React.FC<CommentInputProps> = ({ handleCommentSubmit }) => {
    const [newComment, setNewComment] = useState('');

    return (
        <div className="flex-col items-start gap-3 mb-4">
            <div className='flex'>
                <Avatar label={"a".charAt(0).toUpperCase()} className="bg-blue-600 text-white w-12 h-12 mr-4" />
                <div className="flex-1">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Viết bình luận của bạn"
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
                        rows={3}
                    />
                </div>
            </div>

            <div className='flex justify-end'>
            <Button
                label="Gửi bình luận"
                className="!bg-blue-500 text-gray-600 rounded-lg px-4 py-2 ml-2 disabled:opacity-50"
                disabled={!newComment.trim()}
                onClick={() => {
                    setNewComment('');
                    handleCommentSubmit(newComment)
                }}
            />
            </div>
        </div>
    );
};

export default CommentInputBox;
