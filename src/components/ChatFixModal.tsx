// File: src/components/ChatFixModal.tsx
import React from 'react';
import { Modal, Button, Spin } from 'antd';
import { useAIChat } from './useAIChat';

interface ChatFixModalProps {
  visible: boolean;
  code: string;
  errorMsg: string;
  onClose: () => void;
  onApply: (fixedCode: string) => void;
}

export default function ChatFixModal({ visible, code, errorMsg, onClose, onApply }: ChatFixModalProps) {
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