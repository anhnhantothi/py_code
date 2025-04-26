import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button} from 'antd';
import axios from 'axios';

interface ChatFixModalProps {
  visible: boolean;
  code: string;
  onClose: () => void;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const ChatFixModal: React.FC<ChatFixModalProps> = ({ visible, code, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      // Initialize conversation with prompt
      setMessages([
        { role: 'system', content: 'You are a helpful assistant that fixes Python code errors.' },
        { role: 'user', content: `Please fix the following Python code:

${code}` }
      ]);
    }
  }, [visible, code]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const resp = await axios.post('/api/chat', { messages: updated });
      const assistantMsg: Message = { role: 'assistant', content: resp.data.message.content };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error contacting ChatGPT.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      title="ChatGPT Fix" 
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="h-64 overflow-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left mb-2'}>
            <div className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>                
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={onClose} className="mr-2">Close</Button>
      </div>
    </Modal>
  );
};

export default ChatFixModal;
