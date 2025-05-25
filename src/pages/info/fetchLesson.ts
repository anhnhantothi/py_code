// file: fetchLesson.ts
import { API_BASE } from "../../config";

export const fetchLessonsByTopic = async (topicId: number) => {
  const token = localStorage.getItem('token');

  if (!token || token === 'undefined') {
    throw new Error('Token không hợp lệ. Hãy đăng nhập lại.');
  }

  const res = await fetch(`${API_BASE}/topics/${topicId}/lessons`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Không thể tải bài học');
  return await res.json();
};

export const fetchLessonStatus = async (lessonId: number) => {
  const token = localStorage.getItem('token');
  console.log(token);
  const res = await fetch(`${API_BASE}/api/lesson-progress/lesson/${lessonId}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) return false;
  const data = await res.json();
  return data.completed;
};