export const fetchTopics = async () => {
  const res = await fetch('http://localhost:5000/topics');
  if (!res.ok) throw new Error('Failed to fetch topics');
  return await res.json();
};

export const fetchLessonDetail = async (lessonId: string) => {
  const token = localStorage.getItem('token');

  if (!token || token === 'undefined') {
    throw new Error('No token found. Please login again.');
  }

  const res = await fetch(`http://localhost:5000/lesson/${lessonId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch lesson detail: ${errorText}`);
  }

  return await res.json();
};

export async function markLessonComplete(lessonId: number) {
  const token = localStorage.getItem('token');

  if (!token || token === 'undefined') {
    throw new Error('Missing token. Please login again.');
  }

  const res = await fetch(`http://localhost:5000/lesson/${lessonId}/complete`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to mark complete');
  }
}

export async function checkTopicComplete(topicId: number): Promise<boolean> {
  const resp = await fetch(`http://localhost:5000/certificate/status?topic_id=${topicId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error || 'Error checking certificate status');
  }

  const data = await resp.json();
  return Boolean(data.complete);
}


export async function issueCertificate(topicId: number): Promise<string> {
  const resp = await fetch('http://localhost:5000/certificate/issue', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ topic_id: topicId }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || 'Error issuing certificate');
  return data.url as string;
}