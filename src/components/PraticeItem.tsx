// import React from 'react';
// // import { Tag } from 'primereact/tag';
// import { User2Icon, HeartIcon } from 'lucide-react';

// interface SearchSuggestionCardProps {
//   title: string;
//   difficulty: Difficulty;
//   tags: string[];
//   completionRate: number;
//   likes?: number;  
// }

// export const SearchSuggestionCard: React.FC<SearchSuggestionCardProps> = ({
//   title,
//   difficulty,
//   tags,
//   completionRate,
//   likes = 100, 
// }) => {
//   const getDifficultyColor = () => {
//     switch (difficulty) {
//       case Difficulty.De:
//         return 'bg-green-500 text-white';
//       case Difficulty.TrungBinh:
//         return 'bg-orange-400 text-white';
//       case Difficulty.Kho:
//         return 'bg-red-500 text-white';
//       default:
//         return 'bg-gray-300 text-black';
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         <div className="w-60 p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col gap-3">
//       {/* Title + Difficulty */}
//       <div className="flex flex-col gap-2">
//         <h3 className="text-base font-semibold text-blue-900 truncate">{title}</h3>
//         <div className={`w-fit px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor()}`}>
//           {difficulty}
//         </div>
//       </div>

//       {/* Tags */}
//       <div className="flex gap-2 flex-wrap">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* Stats */}
//       <div className="flex justify-between items-center text-sm text-gray-600 mt-auto">
//         <div className="flex items-center gap-1">
//           <User2Icon size={16} className="text-green-600" />
//           <span>{completionRate}%</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <HeartIcon size={16} />
//           <span>{likes}</span>
//         </div>
//       </div>
//     </div>

//   </div>
// </div>
//   );
// };

// export enum Difficulty {
//   De = "Dễ",
//   TrungBinh = "Trung Bình",
//   Kho = "Khó",
// }

// export const fakeData: SearchSuggestionCardProps[] = [
//   {
//     title: "maxIncreaseSubArr...",
//     difficulty: Difficulty.De,
//     tags: ["Algorithm", "Array", "Training"],
//     completionRate: 92.5,
//     likes: 100,
//   },
//   {
//     title: "typeOfTriangle",
//     difficulty: Difficulty.De,
//     tags: ["Geometry", "Algorithm"],
//     completionRate: 89.8,
//     likes: 100,
//   },
//   {
//     title: "soloBingoGame",
//     difficulty: Difficulty.TrungBinh,
//     tags: ["game", "Training"],
//     completionRate: 92.5,
//     likes: 150,
//   },
// ];
