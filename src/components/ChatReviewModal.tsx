// File: src/components/ChatReviewModal.tsx
import { Modal, Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useAIChat } from './useAIChat';
import axios from 'axios';
import { API_BASE } from '../config';
import { useToast } from '../contexts/ToastContext';

const token = localStorage.getItem('token');

interface ChatReviewModalProps {
  visible: boolean;
  code: string;
  description: string;
  sampleAnswer?: string;
  slug: string;
  onClose: () => void;
  onUsedAI?: () => void; // Optional: reload hồ sơ sau khi dùng AI
}

export default function ChatReviewModal({
  visible,
  code,
  description,
  sampleAnswer,
  slug,
  onClose,
  onUsedAI
}: ChatReviewModalProps) {
  const toast = useToast();
  const [score, setScore] = useState<number | null>(null);

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

  // ✅ Gọi AI ngay khi visible
  const { loading, response } = useAIChat(visible, messages);

  // ✅ Ghi nhận lượt sử dụng AI sau khi có phản hồi
  useEffect(() => {
    if (!visible || !response) return;

    axios.post(`${API_BASE}/api/use-chat`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(() => {
      window.dispatchEvent(new Event('ai-used'));
      onUsedAI?.();
    }).catch((err) => {
      console.error('❌ Lỗi khi ghi nhận lượt sử dụng AI:', err);
      toast.showWarn("⚠️ Lượt sử dụng không được ghi nhận.");
    });
  }, [visible, response]);

  // ✅ Gửi điểm khi AI đã phản hồi
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

      axios.post(`${API_BASE}/api/practices/submit`, {
        slug,
        code,
        score: extractedScore
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).catch((err) => {
        console.error('❌ Lỗi khi lưu kết quả:', err);
      });
    }
  }, [response]);

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
