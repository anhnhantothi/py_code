export const fetchTopics = async () => {
    const res = await fetch('http://localhost:5000/topics');
    if (!res.ok) throw new Error('Failed to fetch topics');
    return await res.json();
  };
  
  export const fetchLessonDetail = async (lessonId: string) => {
    const res = await fetch(`http://localhost:5000/lesson/${lessonId}`);
    if (!res.ok) throw new Error('Failed to fetch lesson detail');
    return await res.json();
  };
  