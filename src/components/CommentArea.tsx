// ✅ CommentSection.tsx
import { useEffect, useState } from 'react';
import CommentInputBox from './CommentInput';
import CommentCard from './CommentCard';
import { CommentDto } from './types';
import { useParams } from 'react-router-dom';
import { fetchComments, getPracticeIdBySlug, likeComment, postComment } from '../services/commentService';

const CommentSection = () => {
  const { slug } = useParams();
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [practiceId, setPracticeId] = useState<number | null>(null);
  const _practiceId = 2;

  useEffect(() => {
    if (slug) {
      getPracticeIdBySlug(slug).then(setPracticeId);
    }
  }, [slug]);

  const loadComments = async (id: number) => {
    const data = await fetchComments(id);
    setComments(data);
  };

  useEffect(() => {
    if (_practiceId) {
      loadComments(_practiceId);
    }
  }, [practiceId]);

  const handleCommentSubmit = async (content: string) => {
    if (!_practiceId) return;
    await postComment(1, _practiceId, content); // user_id fake
    loadComments(_practiceId);
  };

  const handleReplySubmit = async (content: string, parentId: number) => {
    if (!_practiceId) return;
    await postComment(1, _practiceId, content, parentId);
    loadComments(_practiceId);
  };

  const handleLike = async (id: number) => {
    await likeComment(id);
    if (practiceId) loadComments(practiceId);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-6 bg-white rounded-lg shadow-sm">
      <CommentInputBox handleCommentSubmit={handleCommentSubmit} />
      <div className="space-y-6">
        {comments.length > 0 && comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={{
              ...comment,
              name: comment.username,
              time: new Date(comment.createdAt).toLocaleString(),
            }}
            handleReply={handleReplySubmit}
            handleLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
