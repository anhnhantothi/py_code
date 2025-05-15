import { SearchSuggestionCard, SearchSuggestionCardProps, Difficulty } from './SearchSuggestionCard';

export const fakeData: SearchSuggestionCardProps[] = [
  {
    title: "helloWorldPython",
    difficulty: Difficulty.De,
    tags: ["Python Basics", "Syntax", "Beginner"],
    completionRate: 98.0,
    likes: 200,
  },
  {
    title: "listComprehensionPractice",
    difficulty: Difficulty.De,
    tags: ["Python Basics", "List", "Practice"],
    completionRate: 95.4,
    likes: 180,
  },
  {
    title: "oopWithPython",
    difficulty: Difficulty.TrungBinh,
    tags: ["OOP", "Classes", "Intermediate"],
    completionRate: 88.2,
    likes: 160,
  },
  {
    title: "fileHandlingInPython",
    difficulty: Difficulty.TrungBinh,
    tags: ["File I/O", "Read/Write", "Intermediate"],
    completionRate: 86.7,
    likes: 140,
  },
  {
    title: "exceptionHandling",
    difficulty: Difficulty.TrungBinh,
    tags: ["Error Handling", "Try Except", "Python"],
    completionRate: 90.3,
    likes: 130,
  },
  {
    title: "dataVisualizationBasics",
    difficulty: Difficulty.Kho,
    tags: ["Data Science", "Matplotlib", "Visualization"],
    completionRate: 82.5,
    likes: 120,
  },
  {
    title: "workingWithAPIs",
    difficulty: Difficulty.Kho,
    tags: ["HTTP Requests", "API", "Advanced"],
    completionRate: 78.9,
    likes: 110,
  },
  {
    title: "regexInPython",
    difficulty: Difficulty.Kho,
    tags: ["Regex", "Text Processing", "Advanced"],
    completionRate: 75.0,
    likes: 100,
  },
  {
    title: "buildSimpleCalculator",
    difficulty: Difficulty.De,
    tags: ["Project", "Beginner", "Functions"],
    completionRate: 97.1,
    likes: 190,
  },
];

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Thêm khung bo góc + shadow + nền trắng */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice </h2>
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
