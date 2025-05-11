import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Reply, ThumbsUp } from 'lucide-react';
import CommentInputBox from './CommentInput';
import { FaComment } from 'react-icons/fa';

export type CommentDto = {
    id: number;
    name: string;
    time: string;
    content: string;
    likes: number;
    replies: CommentDto[];
    hidden: boolean;
};


interface CommentInputProps {
    comment:CommentDto;
    handleReply: (e:string) => void;
    handleLike: (e:number) => void;

}
const CommentCard = ({ comment,handleReply,handleLike }: { comment: CommentDto, handleReply:(e:string) => void,handleLike: (e:number) => void}) => {
    const [showInput ,setShowInput] = useState(true)
    return (
        <div className="bg-blue-50 p-4 rounded-2xl shadow-lg mb-4">
            <div className="flex items-start gap-4">
                <Avatar label={comment.name.charAt(0).toUpperCase()} className="bg-blue-600 text-white w-12 h-12" />
                <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-700">{comment.name}</div>
                    <div className="text-sm text-gray-500">{comment.time}</div>
                    <p className="mt-2 text-gray-800">{comment.content}</p>
                    <div className="flex items-center gap-2 mt-4">
                        <span className='flex mr-2 hover:cursor-pointer ' onClick={()=>handleLike(comment.id)}>
                            <ThumbsUp size={20} className="text-gray-600 mr-1" />
                            <span className="text-gray-600">{comment.likes.toString()}</span>
                        </span>
                        <span className='flex mr-2 hover:cursor-pointer' onClick={(e)=>setShowInput(!showInput)}>
                        <FaComment size={20} className="text-gray-600 hover:cursor-pointer" />
                            <span className="text-gray-600">Trả lời</span>
                        </span>
                    </div>
                </div>
            </div>
            {
                comment.replies.map((e)=>{
                    return   <div className="flex items-start gap-4 pl-10 mt-5">
                    <Avatar label={e.name.charAt(0).toUpperCase()} className="bg-blue-600 text-white w-12 h-12" />
                    <div className="flex-1">
                        <div className="text-lg font-semibold text-gray-700">{e.name}</div>
                        <div className="text-sm text-gray-500">{e.time}</div>
                        <p className="mt-2 text-gray-800">{e.content}</p>
                        <div className="flex items-center gap-2 mt-4">
                            <span className='flex mr-2 hover:cursor-pointer ' onClick={()=>handleLike(e.id)}>
                                <ThumbsUp size={20} className="text-gray-600 mr-1" />
                                <span className="text-gray-600">{e.likes.toString()}</span>
                            </span>
                            <span className='flex mr-2 hover:cursor-pointer' onClick={(e)=>setShowInput(!showInput)}>
                            <FaComment size={20} className="text-gray-600 hover:cursor-pointer" />
                                <span className="text-gray-600">Trả lời</span>
                            </span>
                        </div>
                    </div>
                </div>
                })
            }
            <div className='mt-10' hidden={showInput}>
            <CommentInputBox handleCommentSubmit={handleReply}/>
            </div>
      
        </div>
    );
};

export default CommentCard;
