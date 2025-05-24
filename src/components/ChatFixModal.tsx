// File: src/components/ChatFixModal.tsx
import React, { useEffect } from 'react';
import { Modal, Button, Spin } from 'antd';
import { useAIChat } from './useAIChat';
import axios from 'axios';
import { API_BASE } from '../config';

const token = localStorage.getItem('token');

interface ChatFixModalProps {
  visible: boolean;
  code: string;
  errorMsg: string;
  onClose: () => void;
  onApply: (fixedCode: string) => void;
  onUsedAI?: () => void; //  callback function to load user profile
}

export default function ChatFixModal({ visible, code, errorMsg, onClose, onApply, onUsedAI }: ChatFixModalProps) {
  const prompt = `The following Python code produced this error:
${errorMsg}

CCode:
\`\`\`python
${code}
\`\`\`
Please provide a corrected version without explanation.`;

  const messages = [
    { role: 'system', content: 'You are a helpful Python assistant.' },
    { role: 'user', content: prompt }
  ];

  const { loading, response } = useAIChat(visible, messages);

  // Call API to count usage
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
    });
  }, [visible, response]);

  const getFixedCode = () => {
    const match = response.match(/```python\n([\s\S]*?)```/);
    return match ? match[1] : response;
  };

  return (
    <Modal
      open={visible}
      title="AI Code Fix"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="apply" type="primary" disabled={loading || !response} onClick={() => onApply(getFixedCode())}>
          {loading ? <Spin size="small" /> : 'Apply Fix'}
        </Button>
      ]}
      width={700}
    >
      {loading ? (
        <div className="text-center"><Spin /></div>
      ) : (
        <pre className="p-4 bg-gray-100 rounded whitespace-pre-wrap font-mono">
          {response || 'No response.'}
        </pre>
      )}
    </Modal>
  );
}
