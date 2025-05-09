// File: src/components/ChatFixModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Spin } from 'antd';
import axios from 'axios';

interface ChatFixModalProps {
  visible: boolean;
  code: string;
  errorMsg: string;
  onClose: () => void;
  onApply: (fixedCode: string) => void;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export default function ChatFixModal({ visible, code, errorMsg, onClose, onApply }: ChatFixModalProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');

  // send initial fix request when modal opens
  useEffect(() => {
    if (!visible) return;
    const fetchFix = async () => {
      setLoading(true);
      try {
        const prompt = `The following Python code produced this error:\n${errorMsg}\n\nCode:\n\`\`\`python\n${code}\n\`\`\`\nPlease provide a corrected version without explanation.`;
        const resp = await axios.post('http://localhost:5000/api/chat', {
          messages: [
            { role: 'system', content: 'You are a helpful Python assistant.' },
            { role: 'user', content: prompt }
          ]
        });
        setResponse(resp.data.message.content.trim());
      } catch (err: any) {
        setResponse('Failed to get fix from AI.');
      } finally {
        setLoading(false);
      }
    };
    fetchFix();
  }, [visible, code, errorMsg]);

  // extract code block from AI response
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
