// ✅ CommentCard.tsx
import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { ThumbsUp } from 'lucide-react';
import { FaComment } from 'react-icons/fa';
import CommentInputBox from './CommentInput';
import { formatDistanceToNow, parseISO, differenceInDays } from 'date-fns';

export type CommentDto = {
  id: number;
  userId: number;
  practiceId: number;
  content: string;
  likes: number;
  created_at: any;
  replies: CommentDto[];
  username: string;
};

interface EnrichedComment extends CommentDto {
  name: string;
  time: string;
}

interface CommentCardProps {
  comment: EnrichedComment;
  handleReply: (content: string, parentId: number) => void;
  handleLike: (id: number) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, handleReply, handleLike }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleSubmitReply = (replyContent: string) => {
    handleReply(replyContent, comment.id);
    setShowReplyInput(false);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-2xl shadow-lg mb-4">
      <div className="flex items-start gap-4">
        <Avatar
          label={comment.name.charAt(0).toUpperCase()}
          className="bg-blue-600 text-white w-12 h-12"
        />
        <div className="flex-1">
          <div className="text-lg font-semibold text-gray-700">{comment.name}</div>
          <div className="text-sm text-gray-500">{getRelativeTime(comment.created_at)}</div>
          <p className="mt-2 text-gray-800">{comment.content}</p>

          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1 hover:cursor-pointer" onClick={() => handleLike(comment.id)}>
              <ThumbsUp size={18} className="text-gray-600" />
              <span className="text-gray-600 text-sm">{comment.likes}</span>
            </span>
            <span className="flex items-center gap-1 hover:cursor-pointer" onClick={() => setShowReplyInput(!showReplyInput)}>
              <FaComment size={18} className="text-gray-600" />
              <span className="text-gray-600 text-sm">Trả lời</span>
            </span>
          </div>

          {showReplyInput && (
            <div className="mt-4">
              <CommentInputBox handleCommentSubmit={handleSubmitReply} />
            </div>
          )}

          {comment.replies?.length > 0 && (
            <div className="mt-6 space-y-4 pl-6 border-l border-blue-200">
              {comment.replies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={{
                    ...reply,
                    name: comment.name||`User ${reply.userId}`,
                    time: new Date(reply.created_at).toLocaleString(),
                  }}
                  handleReply={handleReply}
                  handleLike={handleLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;


const getRelativeTime = (createdAt: Date | string) => {
  const createdDate = new Date(createdAt);
  const createdLocal = new Date(createdDate.getTime() + 7 * 60 * 60 * 1000); // +7h

  const now = new Date();
  const diffMs = now.getTime() - createdLocal.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 7) {
    return createdLocal.toLocaleString('vi-VN'); // hiển thị theo giờ Việt Nam
  }

  if (diffDays >= 1) return `${diffDays} ngày trước`;
  if (diffHours >= 1) return `${diffHours} giờ trước`;
  if (diffMinutes >= 1) return `${diffMinutes} phút trước`;
  return `Vừa xong`;
};

