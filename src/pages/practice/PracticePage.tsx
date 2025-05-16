import { useEffect, useState } from 'react';
import { SearchSuggestionCard, SearchSuggestionCardProps } from './SearchSuggestionCard';
import { fetchPractices } from '../../services/practiceService';
import { Difficulty } from './difficultyEnum';
const convertDifficulty = (level: string): Difficulty => {
  switch (level) {
    case 'EASY':
      return Difficulty.De;
    case 'MEDIUM':
      return Difficulty.TrungBinh;
    case 'HARD':
      return Difficulty.Kho;
    default:
      return Difficulty.De;
  }
};

export default function PracticePage() {
  const [data, setData] = useState<SearchSuggestionCardProps[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchPractices();
      setData(result);
      console.log('Dữ liệu bài tập:', result);
    };
    console.log('Dữ liệu bài tập:', filteredData);
    loadData();
    }, []);
  
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const filteredData = data.filter(item =>
    (!filter || item.difficulty === convertDifficulty(filter)) &&
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
            {filteredData.map((problem, index) => (
              <SearchSuggestionCard
                key={index}
                title={problem.title}
                slug={problem.slug} 
                difficulty={problem.difficulty}
                tags={problem.tags}
                completionRate={problem.completionRate}
                likes={problem.likes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
