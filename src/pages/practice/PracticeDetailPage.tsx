import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PythonRunner from '../../components/PythonRunner';
import { Difficulty } from './difficultyEnum';
import { fetchPracticeBySlug } from '../../services/practiceService';
import CommentSection from '../../components/CommentArea';
import { Button } from 'antd';
import ChatReviewModal from '../../components/ChatReviewModal';


const mapDifficultyToVietnamese = (diff: string): string => {
  switch (diff) {
    case 'EASY':
      return Difficulty.EASY;
    case 'MEDIUM':
      return Difficulty.MEDIUM;
    case 'HARD':
      return Difficulty.HARD;
    default:
      return diff;
  }
};

export default function PracticeDetailPage() {
  const [code, setCode] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
const [submittedCode, setSubmittedCode] = useState('');

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
const handleSubmitCode = (code: string) => {
  setSubmittedCode(code);
  setShowReviewModal(true);
};

  return (
    <div className="w-full h-screen flex gap-4 overflow-hidden">
      {/* Cột trái: đề bài + bình luận */}
      <div className="w-full md:w-2/5 flex flex-col gap-6 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-violet-100 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200">
          <h3 className="text-3xl font-extrabold text-gray-800 mb-3">{data.title}</h3>
          <div className="text-sm text-purple-600 font-medium mb-1">Độ khó: {mapDifficultyToVietnamese(data.difficulty)}</div>
          <div className="text-xs text-gray-500 italic mb-3">Tags: {data.tags.join(', ')}</div>
          <pre className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-700 whitespace-pre-wrap font-mono">{data.description}</pre>
        </div>

        <div className="bg-white shadow-md p-5 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">💬 Bình luận</h2>
          <CommentSection id={data.id as number} />
        </div>
      </div>

      {/* Cột phải: CMD cố định */}

      <div className="w-full md:w-3/5 h-screen sticky top-0 overflow-hidden p-6 bg-white shadow-inner">
        <h2 className="text-xl font-semibold mb-4">💻 Viết và chạy mã Python:</h2>
        <div className="h-[calc(100vh-120px)] overflow-y-auto scrollbar-none">
          <PythonRunner
            initialCode={code}
            expandOutput={true}
            readOnly={false}
            showLintButton={true}
            onSubmit={handleSubmitCode}
            onChange={(val) => setCode(val)}
            extraElements={
              <Button type="primary" onClick={() => handleSubmitCode(code)}>
                Nộp bài
              </Button>
            }
          />
        </div>
        <ChatReviewModal
          visible={showReviewModal}
          code={submittedCode}
          description={data.description}
          sampleAnswer={data.sampleAnswer} // if exists
          slug={data.slug}
          onClose={() => setShowReviewModal(false)}
        />
      </div>
    </div>
  );
}