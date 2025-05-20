// src/pages/practice/PracticePage.tsx

import { useEffect, useState } from 'react';
import { SearchSuggestionCard, SearchSuggestion } from './SearchSuggestionCard';
import { fetchPractices } from '../../services/practiceService';
import { Difficulty } from './difficultyEnum';

export default function PracticePage() {
  const [data, setData] = useState<SearchSuggestion[]>([]);
  const [filter, setFilter] = useState<string>('');  // giữ filter là string 'EASY' | 'MEDIUM' | 'HARD'
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchPractices(); 
      const mapped = result.map((item: any, index: number): SearchSuggestion => ({
        id: item.id ?? index,
        isActive: item.active ?? false,
        title: item.title,
        slug: item.slug,
        difficulty: item.difficulty, 
        tags: item.tags || [],
        completionRate: item.completionRate || 0,
        likes: item.likes || 0,
      }));
      setData(mapped);
    };
    loadData();
  }, []);

  // map từ filter string sang enum
  const filterMap: Record<string, Difficulty> = {
    EASY: Difficulty.EASY,
    MEDIUM: Difficulty.MEDIUM,
    HARD: Difficulty.HARD,
  };

  const filteredData = data.filter(item =>
    (!filter || item.difficulty === filterMap[filter]) &&
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm bài tập..."
            className="border px-3 py-2 rounded-md w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="EASY">Dễ</option>
            <option value="MEDIUM">Trung Bình</option>
            <option value="HARD">Khó</option>
          </select>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice Problems</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredData.map((problem) => (
              <SearchSuggestionCard
                key={problem.id}
                {...problem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
