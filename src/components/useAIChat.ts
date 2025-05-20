// File: src/hooks/useAIChat.ts

import { useState, useEffect } from 'react';
import { sendAIChat } from '../services/aichatService';

/**
 * Hook dùng để gọi GPT với messages dạng Chat API.
 * @param visible - Modal đang mở hay không
 * @param messages - Mảng messages (system/user) gửi lên GPT
 */
export function useAIChat(visible: boolean, messages: any[]) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (!visible) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const result = await sendAIChat(messages);
        setResponse(result);
      } catch (err) {
        console.error('❌ GPT error:', err);
        setResponse('❌ Lỗi khi gọi GPT.');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [visible, JSON.stringify(messages)]);

  return { loading, response };
}
