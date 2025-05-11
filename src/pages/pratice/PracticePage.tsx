import { SearchSuggestionCard, SearchSuggestionCardProps, Difficulty } from './SearchSuggestionCard';

export const fakeData: SearchSuggestionCardProps[] = [
  {
    title: "maxIncreaseSubArr...",
    difficulty: Difficulty.De,
    tags: ["Algorithm", "Array", "Training"],
    completionRate: 92.5,
    likes: 100,
  },
  {
    title: "typeOfTriangle",
    difficulty: Difficulty.De,
    tags: ["Geometry", "Algorithm"],
    completionRate: 89.8,
    likes: 100,
  },
  {
    title: "soloBingoGame",
    difficulty: Difficulty.TrungBinh,
    tags: ["game", "Training"],
    completionRate: 92.5,
    likes: 150,
  },
];

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Thêm khung bo góc + shadow + nền trắng */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice Problems</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fakeData.map((problem, index) => (
              <SearchSuggestionCard key={index} {...problem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
