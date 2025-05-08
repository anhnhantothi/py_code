// File: src/services/exerciseService.ts
import { API_BASE } from '../config';
export interface Exercise {
    id: number;
    title: string;
    description: string;
    initial_code: string;
    expected_output: string;
    // thêm các trường khác nếu cần
  }
  
  /**
   * Lấy dữ liệu bài tập theo lessonId
   * @param lessonId
   */
  export async function fetchExercise(lessonId: string): Promise<Exercise> {
    const response = await fetch(
      ` ${API_BASE}/lesson/${lessonId}/exercise`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Không thể tải bài tập');
    }
    return data;
  }
  
  export const submitExercise = async (exerciseId: number, code: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/exercise/${exerciseId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ code }) 
    });
  
    if (!res.ok) {
      throw new Error('Lỗi khi nộp bài.');
    }
  
    return res.json();  // { correct, actual_output }
  };