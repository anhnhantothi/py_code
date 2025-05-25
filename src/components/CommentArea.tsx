// ✅ CommentSection.tsx
import { useEffect, useState } from 'react';
import CommentInputBox from './CommentInput';
import CommentCard from './CommentCard';
import { CommentDto } from './types';
import { useParams } from 'react-router-dom';
import { fetchComments, getPracticeIdBySlug, likeComment, postComment } from '../services/commentService';
import { useAuth } from '../contexts/auth_context';
interface CommentSectionProps {
  id: any;
}
const CommentSection = ({id}:CommentSectionProps) => {
  const { slug } = useParams();
  const [comments, setComments] = useState<CommentDto[]>([]);
  const _practiceId = id;
  const { user } = useAuth();
  // console.log("Current User ID:", user?.id, "Username:", user?.username, user?.full_name);
  

  useEffect(() => {
    loadComments(_practiceId);
    if (slug) {
      getPracticeIdBySlug(slug).then((id) => {
        if (id) {
          loadComments(id);
        }
      });
    }
  }, [slug]);

  const loadComments = async (id: number) => {
    const data = await fetchComments(id);
    setComments(data);
  };


  const handleCommentSubmit = async (content: string) => {
    if (!_practiceId) return;
    await postComment(user!.user_id!, _practiceId, content); 
    loadComments(_practiceId);
  };

  const handleReplySubmit = async (content: string, parentId: number) => {
    if (!_practiceId) return;
    await postComment(user!.user_id!, _practiceId, content, parentId);
    loadComments(_practiceId);
  };

  const handleLike = async (id: number) => {
    await likeComment(id);
    if (_practiceId) loadComments(_practiceId);
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
              time: new Date(comment.created_at).toLocaleString(),
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
