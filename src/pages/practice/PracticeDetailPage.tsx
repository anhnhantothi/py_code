import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PythonRunner from '../../components/PythonRunner';
import { Difficulty } from './difficultyEnum';
import { fetchPracticeBySlug } from '../../services/practiceService';
import CommentSection from '../../components/CommentArea';

const mapDifficultyToVietnamese = (diff: string): string => {
  switch (diff) {
    case 'EASY':
      return Difficulty.De;
    case 'MEDIUM':
      return Difficulty.TrungBinh;
    case 'HARD':
      return Difficulty.Kho;
    default:
      return diff;
  }
};

export default function PracticeDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      fetchPracticeBySlug(slug)
        .then(setData)
        .catch((err) => console.error("Không thể tải đề bài:", err));
    }
  }, [slug]);

  if (!data) return <p className="p-4">Đang tải đề bài...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 max-w-6xl mx-auto">
      {/* Cột trái: đề bài + bình luận */}
      <div className="col-span-1 flex flex-col gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
          <div className="text-sm text-gray-600 mb-1">Độ khó: {mapDifficultyToVietnamese(data.difficulty)}</div>
          <div className="text-sm text-gray-500 mb-2">Tags: {data.tags.join(', ')}</div>
          <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap text-sm">{data.description}</pre>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Bình luận</h2>
          <CommentSection />
        </div>
      </div>

      {/* Cột phải: CMD, nút, output */}
      <div className="col-span-2 bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">💻 Viết và chạy mã Python:</h2>
        <PythonRunner initialCode="" expandOutput={true} showLintButton={true} />
      </div>
    </div>
  );
}
