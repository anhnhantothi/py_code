// File: src/services/exerciseService.ts

export interface Exercise {
    id: string;
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
      ` http://localhost:5000/lesson/${lessonId}/exercise`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Không thể tải bài tập');
    }
    return data;
  }
  