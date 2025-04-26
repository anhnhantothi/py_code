/* File: src/pages/LessonPage.tsx */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from 'antd';
import PythonRunner from '../../components/PythonRunner';
import LeftSidebarMenu from '../../components/LeftSideBar';

const { Content, Sider } = Layout;

const menuItems: any[] = [
  {
    key: '/lesson',
    label: <Link to="/lesson">LV1</Link>,
    children: [
      { key: '/lesson/intro', label: <Link to="/lesson/intro">câu lệnh print</Link> },
      { key: '/lesson/variables', label: <Link to="/lesson/variables">Variables</Link> },
    ],
  },
  {
    key: '/document',
    label: <Link to="/document">LV2</Link>,
    children: [
      { key: '/document/quickstart', label: <Link to="/document/quickstart">Quick Start</Link> },
      { key: '/document/api', label: <Link to="/document/api">API Reference</Link> },
    ],
  },
];

interface Sublesson {
  id: number;
  type: 'title' | 'cmd' | 'text' | 'example';
  content: string;
  sort_order: number;
}

interface Lesson {
  id: number;
  title: string;
  level: string;
  description: string;
  sublessons: Sublesson[];
}

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: replace with actual fetch
    const mockLesson: Lesson = {
      id: Number(lessonId),
      title: 'Bài tập Python',
      level: 'LV 1',
      description: 'Hãy in ra màn hình hello world',
      sublessons: [
        { id: 1, type: 'cmd', content: 'print("Hello, World!")', sort_order: 1 }
      ]
    };
    setLesson(mockLesson);
  }, [lessonId]);

  if (error) return <div className="text-red-500 p-4">Lỗi: {error}</div>;
  if (!lesson) return <div className="text-gray-500 p-4">Đang tải...</div>;

  // Sort sublessons
  const sorted = [...lesson.sublessons].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <Layout className="w-screen h-screen">
      <Sider width={240} className="bg-white border-r border-gray-200">
        <LeftSidebarMenu items={menuItems} />
      </Sider>
      <Content className="overflow-auto p-6 lg:p-8">
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{lesson.title}</h1>
          <p className="text-sm text-gray-500 mb-4">Level: {lesson.level}</p>
          <p className="text-gray-700">{lesson.description}</p>
        </div>

        <div className="space-y-6">
          {sorted.map(block => (
            <div key={block.id} className="bg-white shadow-md rounded p-6">
              {block.type === 'title' && (
                <div
                  className="prose prose-blue mb-4"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              )}
              {block.type === 'cmd' && (
                <PythonRunner initialCode={block.content} />
              )}
              {block.type === 'text' && (
                <div
                  className="prose prose-gray"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              )}
              {block.type === 'example' && (
                <div
                  className="prose prose-green"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              )}
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default LessonPage;
