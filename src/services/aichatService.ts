// File: src/services/aichatService.ts
import axios from 'axios';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const sendAIChat = async (messages: Message[]) => {
  try {
    const response = await axios.post('http://localhost:5000/api/chat', { messages });
    return response.data.message.content.trim();
  } catch (error: any) {
    console.error('Error in sendAIChat:', error);
    throw new Error('Failed to get fix from AI.');
  }
};
