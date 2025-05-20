import { Difficulty } from "./difficultyEnum";
import { SearchSuggestion } from "./SearchSuggestionCard";

export const generateFakeSearchSuggestions = (count: number = 10): SearchSuggestion[] => {
    const difficulties = [Difficulty.De, Difficulty.TrungBinh, Difficulty.Kho];
    const tagsList = ["JavaScript", "React", "TypeScript", "Java", "Python", "Spring", "MongoDB"];

  const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const randomTags = () => Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => randomElement(tagsList));

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    active: Math.random() < 0.8,
    title: `Challenge ${index + 1}`,
    difficulty: randomElement(difficulties) as Difficulty,
    tags: randomTags(),
    completionRate: Math.floor(Math.random() * 101),
    likes: Math.floor(Math.random() * 1000),
    slug: `challenge-${index + 1}`,
  }));
};
