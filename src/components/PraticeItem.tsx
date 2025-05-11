import React from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import { User2Icon } from 'lucide-react';

interface SearchSuggestionCardProps {
  title: string;
  difficulty: Difficulty;
  tags: string[];
  completionRate: number;
}

export const SearchSuggestionCard: React.FC<SearchSuggestionCardProps> = ({
  title,
  difficulty,
  tags,
  completionRate,
}) => {
  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col gap-3 ">
      {/* Title and Difficulty Button */}
      <div className="flex-col items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-600 truncate">{title}</h3>
        <div
          className="w-auto bg-[#15ed4f] px-2 py-1 border border-rounded"
        >{difficulty}</div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            value={tag}
            className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-md"
          />
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-1">
            <User2Icon size={18}/>
          <span>{completionRate}%</span>
        </div>
      </div>
    </div>
  );
};



enum Difficulty {
    De = "Dễ",
    TrungBinh = "Trung Bình",
    Kho = "Khó",
  }
  
 export const fakeData: SearchSuggestionCardProps[] = [
    {
      title: "maxIncreaseSubArr.",
      difficulty: Difficulty.De,
      tags: ["Algorithm", "Array", "Training"],
      completionRate: 92.5,
    },
    {
      title: "binarySearchTree",
      difficulty: Difficulty.TrungBinh,
      tags: ["Algorithm", "Tree", "Data Structure"],
      completionRate: 75.3,
    },
    {
      title: "dynamicProgramming",
      difficulty: Difficulty.Kho,
      tags: ["Algorithm", "DP", "Optimization"],
      completionRate: 60.1,
    },
  ];