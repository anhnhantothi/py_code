import axios from 'axios';
import { API_BASE } from '../config';

export const getPracticeIdBySlug = async (slug: string) => {
  const res = await axios.get(`/api/practices/slug/${slug}`);
  return res.data.id;
};

export const fetchComments = async (practiceId: number) => {
  const res = await axios.get(`${API_BASE}/api/comments?practice_id=${practiceId}`);
  return res.data;
};

export const postComment = async (userId: number, practiceId: number, content: string, parentId?: number) => {
  const payload: any = {
    user_id: userId,
    practice_id: practiceId,
    content,
  };
  if (parentId) payload.parent_id = parentId;
  await axios.post('http://localhost:5000/api/comments', payload);
};

export const likeComment = async (commentId: number) => {
  await axios.post(`/api/comments/like/${commentId}`);
};