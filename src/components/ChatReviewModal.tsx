// File: src/components/ChatReviewModal.tsx
import { Modal, Button, Spin } from 'antd';
import { useAIChat } from './useAIChat';

interface ChatReviewModalProps {
  visible: boolean;
  code: string;
  description: string;
  sampleAnswer?: string;
  onClose: () => void;
}

export default function ChatReviewModal({ visible, code, description, sampleAnswer, onClose }: ChatReviewModalProps) {
  const prompt = `Bạn là giáo viên Python, hãy đánh giá đoạn mã học sinh viết cho yêu cầu sau:

Đề bài:
${description}

Mã của học sinh:
\`\`\`
${code}
\`\`\`

🎯 Đáp án mẫu (nếu có):
${sampleAnswer || 'Không có'}

Hãy trả lời với:
-  Mã đúng hay sai
-  Giải thích ngắn 
-  Cho điểm từ 0–10
- ✍️ Gợi ý ngắn cải thiện nếu cần
`;

  const messages = [
    { role: 'system', content: 'Bạn là giáo viên Python chấm bài học sinh.' },
    { role: 'user', content: prompt }
  ];

  const { loading, response } = useAIChat(visible, messages);

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
