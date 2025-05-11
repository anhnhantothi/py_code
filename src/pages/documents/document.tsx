/* File: src/pages/DocumentationPage.tsx */
import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import PythonRunner from '../../components/PythonRunner';
import LeftSidebarMenu from '../../components/LeftSideBar';
import { fakeData, SearchSuggestionCard } from '../../components/PraticeItem';

// Định nghĩa menu cho DocumentationPage
const docMenuItems: any[] = [
  {
    key: '/document/intro',
    label: <Link to="/document/intro">Introduction</Link>,
  },
  {
    key: '/document/variables',
    label: <Link to="/document/variables">Variables</Link>,
  },
  {
    key: '/document/control',
    label: <Link to="/document/control">Control Flow</Link>,
  },
];

// Mỗi khối tài liệu có thể là title, text hoặc code
interface DocBlock {
  id: string;
  type: 'title' | 'text' | 'code';
  content: string;
}

// Dữ liệu tài liệu dưới dạng mảng các khối liên tiếp
const docBlocks: DocBlock[] = [
  { id: 'intro-title', type: 'title', content: 'Giới thiệu tài liệu Python' },
  {
    id: 'intro-text', type: 'text', content: `
    <p><strong>Python</strong> là ngôn ngữ lập trình mạnh mẽ, dễ học và có cú pháp rõ ràng.</p>
    <p>Trong tài liệu này, bạn sẽ tìm hiểu các khái niệm cơ bản và thực hành các ví dụ Python ngay trên trình duyệt.</p>
  ` },
  {
    id: 'intro-code', type: 'code', content: `# Ví dụ 1: In ra một câu chào
print("Xin chào, Python!")` },
  {
    id: 'intro-text', type: 'text', content: `
  <p><strong>Python</strong> là ngôn ngữ lập trình mạnh mẽ, dễ học và có cú pháp rõ ràng.</p>
  <p>Trong tài liệu này, bạn sẽ tìm hiểu các khái niệm cơ bản và thực hành các ví dụ Python ngay trên trình duyệt.</p>
` },
  // Bạn có thể mở rộng thêm các khối khác tương ứng với menu
];

const DocumentationPage: React.FC = () => (
  <Layout className="w-screen h-screen">
    <div className='flex bg-gray-100 gap-4 p-4'>
      {
        fakeData.map((e) => <SearchSuggestionCard completionRate={e.completionRate} difficulty={e.difficulty} tags={e.tags} title={e.title} />
        )
      }
    </div>
  </Layout>
);

export default DocumentationPage;