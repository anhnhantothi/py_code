// src/utils/authFetch.ts
export async function authFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const res = await fetch(url, {
      ...options,
      headers,
    });
  
    return res;
  }
  