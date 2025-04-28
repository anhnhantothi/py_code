// File: src/pages/LessonPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Layout, Spin, Menu } from 'antd';
import PythonRunner from '../../components/PythonRunner';
import { fetchTopics, fetchLessonDetail } from '../../services/lessonService'; 

const { Content, Sider } = Layout;

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

interface Topic {
  id: number;
  name: string;
  lessons: { id: number; title: string }[];
}

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);

        if (lessonId) {
          const fetchedLesson = await fetchLessonDetail(lessonId);
          setLesson(fetchedLesson);
        } else {
          setLesson(null); // nếu không có lessonId
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lessonId]);

  const sidebarItems = topics.map(topic => ({
    key: `topic-${topic.id}`,
    label: topic.name,
    children: topic.lessons.map(lesson => ({
      key: `/lesson/${lesson.id}`,
      label: lesson.title,
    })),
  }));

  const onMenuClick = (e: any) => {
    navigate(e.key);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spin size="large" tip="Đang tải dữ liệu..." fullscreen />
      </div>
    );
  }

  return (
    <Layout className="w-screen h-screen">
      <Sider width={250} className="bg-white border-r border-gray-200">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={sidebarItems}
          onClick={onMenuClick}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>
      <Content className="overflow-auto p-6 lg:p-8">
        {lesson ? (
          <>
            <div className="bg-white shadow-md rounded p-6 mb-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">{lesson.title}</h1>
              <p className="text-sm text-gray-500 mb-4">Level: {lesson.level}</p>
              <p className="text-gray-700">{lesson.description}</p>
            </div>
            <div className="space-y-6">
              {lesson.sublessons.map(block => (
                <div key={block.id} className="bg-white shadow-md rounded p-6">
                  {block.type === 'title' && <div dangerouslySetInnerHTML={{ __html: block.content }} />}
                  {block.type === 'text' && <div dangerouslySetInnerHTML={{ __html: block.content }} />}
                  {block.type === 'cmd' && <PythonRunner initialCode={block.content} />}
                  {block.type === 'example' && <div dangerouslySetInnerHTML={{ __html: block.content }} />}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center mt-10">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">Chào mừng bạn đến với khóa học Python!</h1>
            <p className="text-gray-600">Vui lòng chọn một bài học từ menu bên trái để bắt đầu nhé.</p>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default LessonPage;
