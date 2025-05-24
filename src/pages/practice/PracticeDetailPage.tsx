// File: src/pages/practice/PracticeDetailPage.tsx
import { LeftOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
const { Paragraph } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PythonRunner from '../../components/PythonRunner';
import ChatReviewModal from '../../components/ChatReviewModal';
import CommentSection from '../../components/CommentArea';
import { fetchPracticeBySlug } from '../../services/practiceService';
import { Difficulty } from './difficultyEnum';
import { useCheckChatLimit } from '../../hooks/useCheckChatLimit';

const mapDifficultyToVietnamese = (diff: string): string => {
  switch (diff) {
    case 'EASY': return Difficulty.EASY;
    case 'MEDIUM': return Difficulty.MEDIUM;
    case 'HARD': return Difficulty.HARD;
    default: return diff;
  }
};

export default function PracticeDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [code, setCode] = useState('');
  const [submittedCode, setSubmittedCode] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { checkLimit } = useCheckChatLimit();

  useEffect(() => {
    if (!slug) return;
    fetchPracticeBySlug(slug)
      .then(setData)
      .catch(console.error);
  }, [slug]);

  if (!data) return <p className="p-4">Đang tải đề bài...</p>;

  
const handleSubmitCode = async (c: string) => {
  const allowed = await checkLimit();
  if (!allowed) return;
  setSubmittedCode(c);
  setShowReviewModal(true);
};

  return (
    <div className="w-full h-screen flex flex-col">
      {/* --- CUSTOM HEADER --- */}
      <div className="flex items-center space-x-4 p-4 bg-white shadow-sm z-10">
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate('/practice')}
        >
          Trở về
        </Button>
        {/* <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1> */}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-full md:w-2/5 p-6 overflow-y-auto bg-gradient-to-b from-white via-gray-50 to-gray-100 space-y-6">
          <div className="bg-white shadow rounded-lg border border-gray-200 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">{data.title}</h2>
            <Paragraph className="text-gray-700">{data.description}</Paragraph>
            <div className="ml-auto text-sm text-purple-600">
              Độ khó: {mapDifficultyToVietnamese(data.difficulty)}
            </div>


            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag: string) => (
                <Tag color="geekblue" key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg border border-gray-200 p-5">
            <h3 className="text-lg font-medium mb-3">💬 Bình luận</h3>
            <CommentSection id={data.id} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-3/5 p-6 bg-white shadow-inner flex flex-col">
          <h3 className="text-lg font-medium mb-4">💻 Viết và chạy mã Python:</h3>
          <div className="flex-1 overflow-y-auto">
            <PythonRunner
              initialCode={code}
              expandOutput
              showLintButton
              onSubmit={handleSubmitCode}
              onChange={setCode}
              extraElements={
                <Button
                  type="primary"
                  className="ml-2"
                  onClick={() => handleSubmitCode(code)}
                >
                  Nộp bài
                </Button>
              }
            />
          </div>
          <ChatReviewModal
            visible={showReviewModal}
            code={submittedCode}
            description={data.description}
            sampleAnswer={data.sampleAnswer}
            slug={data.slug}
            onClose={() => setShowReviewModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
