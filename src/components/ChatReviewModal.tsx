// File: src/components/ChatReviewModal.tsx
import { Modal, Button, Spin } from 'antd';
import { useAIChat } from './useAIChat';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_BASE} from '../config';
const token = localStorage.getItem('token');

interface ChatReviewModalProps {
  visible: boolean;
  code: string;
  description: string;
  sampleAnswer?: string;
  slug: string;
  onClose: () => void;
}

export default function ChatReviewModal({
  visible,
  code,
  description,
  sampleAnswer,
  slug,
  onClose
}: ChatReviewModalProps) {
  const prompt = `Bạn là giáo viên Python, hãy đánh giá đoạn mã học sinh viết cho yêu cầu sau:

Đề bài:
${description}

Mã của học sinh:
\`\`\`python
${code}
\`\`\`

🎯 Đáp án mẫu (nếu có):
${sampleAnswer || 'Không có'}

Hãy trả lời với:
- Mã đúng hay sai
- Giải thích ngắn
- Cho điểm từ 0–10
- ✍️ Gợi ý ngắn cải thiện nếu cần
`;

  const messages = [
    { role: 'system', content: 'Bạn là giáo viên Python chấm bài học sinh.' },
    { role: 'user', content: prompt }
  ];

  const { loading, response } = useAIChat(visible, messages);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!visible || !response) return;

    const match = response.match(/Điểm:\s*(\d+)/);
    const extractedScore = match ? parseInt(match[1], 10) : null;

    if (
      extractedScore !== null &&
      extractedScore >= 0 &&
      extractedScore <= 10
    ) {
      setScore(extractedScore);
      console.log('📤 Sending submit payload:', {
        slug,
        code,
        score: extractedScore
      });

      axios
        .post(`${API_BASE}/api/practices/submit`, {
          slug,
          code,
          score: extractedScore
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .catch((err) => {
          console.error('❌ Lỗi khi lưu kết quả:', err);
        });
    }
  }, [response, slug, code]);

  return (
    <Modal
      open={visible}
      title="📝 Phản hồi từ AI"
      onCancel={onClose}
      footer={[<Button key="close" onClick={onClose}>Đóng</Button>]}
      width={700}
    >
      {loading ? (
        <div className="text-center"><Spin /></div>
      ) : (
        <pre className="p-4 bg-gray-100 rounded whitespace-pre-wrap font-mono">
          {response || 'Chưa có phản hồi.'}
        </pre>
      )}
    </Modal>
  );
}
