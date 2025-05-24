// services/practiceService.ts
import axios from 'axios';
import {  SearchSuggestionCardProps } from '../pages/practice/SearchSuggestionCard';
import { Difficulty } from '../pages/practice/difficultyEnum';
import { API_BASE } from '../config';

export const convertDifficulty = (raw: string): Difficulty => {
  switch (raw.trim().toUpperCase()) {
    case 'EASY':
      return Difficulty.EASY;
    case 'MEDIUM':
      return Difficulty.MEDIUM;
    case 'HARD':
      return Difficulty.HARD;
    default:
      return Difficulty.EASY;
  }
};

// Gọi API lấy danh sách bài tập
export const fetchPractices = async (): Promise<SearchSuggestionCardProps[]> => {
  const token = localStorage.getItem('token');
  try {
    // const response = await axios.get('http://localhost:5000/api/practices?active=true');
    const response = await axios.get(`${API_BASE}/api/practices?active=true`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.map((item: any) => ({
      title: item.title,
      difficulty: convertDifficulty(item.difficulty),
      tags: item.tags,
      completionRate: item.completionRate,
      likes: item.likes,
      slug: item.slug,
      isCompleted: item.isCompleted,
    }));
  } catch (error) {
    console.error('Lỗi khi gọi API practice:', error);
    return [];
  }
};

export const fetchPracticeBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/practices/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API get practice by slug:", error);
    throw error;
  }
};