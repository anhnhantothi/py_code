// src/pages/practice/SearchSuggestionCard.tsx

import React from 'react';
import { User2Icon, HeartIcon } from 'lucide-react';
import { Difficulty } from './difficultyEnum';
import { Link } from 'react-router-dom';

// Dữ liệu đầy đủ từ backend
export interface SearchSuggestion extends SearchSuggestionCardProps {
  id: number | null;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  isActive: boolean;
  completionRate: number;
  likes?: number;
  slug: string;
}


export interface SearchSuggestionCardProps {
  title: string;
  difficulty: Difficulty;
  tags: string[];
  completionRate: number;
  likes?: number;
  slug: string;
}
 export const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.EASY:
        return 'bg-green-500 text-white';
      case Difficulty.MEDIUM:
        return 'bg-orange-400 text-white';
      case Difficulty.HARD:
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };



export const SearchSuggestionCard: React.FC<SearchSuggestionCardProps> = ({
  title,
  difficulty,
  tags,
  completionRate,
  likes = 100,
  slug,
}) => {


  return (
    <Link to={`/practice/${slug}`}>
      <div className="w-64 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col gap-3 hover:scale-105 hover:shadow-xl transition-transform duration-200">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-blue-900 truncate">{title}</h3>
          <div className={`w-fit px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mt-auto">
          <div className="flex items-center gap-1">
            <User2Icon size={16} className="text-green-600" />
            <span>{completionRate}%</span>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon size={16} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
