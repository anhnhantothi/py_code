// File: src/pages/LessonPage.tsx
import React, { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Layout, Spin, Menu, Button } from 'antd';
import { motion } from 'framer-motion';
import PythonRunner from '../../components/PythonRunner';
import { fetchTopics, fetchLessonDetail, markLessonComplete } from '../../services/lessonService';
import EmptyLesson from './empty-lesson';

const { Content, Sider } = Layout;

interface Sublesson {
  id: number;
  type: 'title' | 'text' | 'cmd' | 'example';
  content: string;
  sort_order: number;
}

interface Lesson {
  id: number;
  title: string;
  level: string;
  description: string;
  unlock_condition: 'read' | 'exercise';
  sublessons: Sublesson[];
}


interface Topic {
  id: number;
  name: string;
  lessons: { id: number; title: string }[];
}

// Component riêng để render từng block
const SublessonBlock: React.FC<{ block: Sublesson }> = memo(({ block }) => {
  const sharedProps = {
    key: `sublesson-${block.id}`,
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.03 * block.sort_order },
  };

  switch (block.type) {
    case 'title':
      return (
        <motion.div {...sharedProps}>
          <div className="mb-6 border-b border-blue-200">
            <h2
              className="text-3xl font-semibold text-blue-700"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        </motion.div>
      );

    case 'text':
      return (
        <motion.div {...sharedProps}>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        </motion.div>
      );

    case 'cmd':
      return (
        <motion.div {...sharedProps}>
          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-indigo-400 flex flex-col">
            <div className="mb-2 text-indigo-600 font-medium text-sm uppercase tracking-wide">
              Mã lệnh Python
            </div>
            <div className="flex-1 h-[300px] overflow-auto">
              <PythonRunner initialCode={block.content } />
            </div>
          </div>
        </motion.div>
      );

    case 'example':
      return (
        <motion.div {...sharedProps}>
          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
            <div className="mb-2 text-green-700 font-medium text-sm uppercase tracking-wide">
              Ví dụ
            </div>
            <div
              className="prose prose-green max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        </motion.div>
      );

    default:
      return null;
  }
});
SublessonBlock.displayName = 'SublessonBlock';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  // Load topics + lesson detail
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);
  
        if (lessonId) {
          const fetchedLesson = await fetchLessonDetail(lessonId);
          setLesson(fetchedLesson);
        } else {
          setLesson(null);
        }
      } catch (err: any) {
        console.error('Error loading lesson or topics:', err);
        alert(err.message || 'Đã xảy ra lỗi khi tải bài học.');
      } finally {
        setLoading(false);
      }
    })();
  }, [lessonId]);
  
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  const sidebarItems = topics.map((topic) => ({
    key: `topic-${topic.id}`,
    label: topic.name,
    children: topic.lessons.map((ls) => ({
      key: `/lesson/${ls.id}`,
      label: ls.title,
    })),
  }));
  const handleCompleteAndNext = async () => {
    const token = localStorage.getItem('token');
    if (!token || !lesson) {
      alert("Bạn chưa đăng nhập hoặc bài học chưa sẵn sàng.");
      return;
    }

    try {
      await markLessonComplete(lesson.id);
      //  Điều hướng sang bài tiếp theo nếu muốn
      // tìm bài tiếp theo trong topics
      const currentTopic = topics.find(topic => topic.lessons.some(l => l.id === lesson.id));
      if (!currentTopic) return;

      const lessonIndex = currentTopic.lessons.findIndex(l => l.id === lesson.id);
      const nextLesson = currentTopic.lessons[lessonIndex + 1];
      if (nextLesson) {
        navigate(`/lesson/${nextLesson.id}`);
      } else {
        alert('🎉 Bạn đã hoàn thành toàn bộ chủ đề này!');
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('Lỗi khi ghi nhận hoàn thành bài học.');
    }
  };
  return (
    <Layout className="w-screen h-screen">
      <Sider width={250} className="bg-white border-r border-gray-200">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={sidebarItems}
          onClick={(e) => navigate(e.key)}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>

      <Content className="overflow-auto p-6 lg:p-8 bg-gray-50">
        {lesson ? (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">
                {lesson.title}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Level: <span className="font-medium">{lesson.level}</span>
              </p>
              <p className="text-gray-700">{lesson.description}</p>
            </div>

            {/* Nội dung sublessons */}
            <div className="space-y-10">
              {lesson.sublessons
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((block) => (
                  <SublessonBlock key={block.id} block={block} />
                ))}
            </div>

            {/* Nút làm bài tập / chuyển tiếp */}
            {lesson.unlock_condition === 'exercise' && (
              <div className="text-sm text-red-500 mb-4">
                ⚠️ Bạn cần hoàn thành bài tập để qua bài này
              </div>
            )}

            {lesson.unlock_condition === 'exercise' ? (
              <Button type="primary" size="large" onClick={() => navigate(`/lesson/${lesson.id}/exercise`)}>
                Làm bài tập
              </Button>
            ) : (
              <Button type="default" size="large" onClick={handleCompleteAndNext}>
                Bài tiếp theo
              </Button>
            )}
          </motion.div>
        ) : (
          <EmptyLesson
            onPromptSidebar={() => navigate('/lesson')}
          />
        )}
      </Content>
    </Layout>
  );
};

export default LessonPage;
