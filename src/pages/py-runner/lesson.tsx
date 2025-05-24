// File: src/pages/LessonPage.tsx
import React, { useState, useEffect, memo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Layout, Spin, Menu, Button, Space } from 'antd';
import { Award  } from 'lucide-react';
import { motion } from 'framer-motion';
import PythonRunner from '../../components/PythonRunner';
import {
  fetchTopics,
  fetchLessonDetail,
  markLessonComplete,
  checkTopicComplete,
  issueCertificate,
} from '../../services/lessonService';
import EmptyLesson from './empty-lesson';
import CertificatePreviewModal from '../../components/CertificatePreviewModal';

const { Content, Sider } = Layout;

export  interface Sublesson {
  id: number;
  type: 'title' | 'text' | 'cmd' | 'example';
  content: string;
  sort_order: number;
}

export  interface Lesson {
  id: number;
  title: string;
  level: string;
  description: string;
  unlock_condition: 'read' | 'exercise';
  sublessons: Sublesson[];
}


export interface Topic {
  id: number;
  name: string;
  sort_order: number;
  lessons: Lesson[];
}

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
              <PythonRunner initialCode={block.content} />
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

  // Lưu luôn currentTopic để dùng sau
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  // Kiểm tra xem mini-course đã hoàn thành chưa
  const [topicComplete, setTopicComplete] = useState(false);
  const [issuing, setIssuing] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);

        if (lessonId) {
          const fetchedLesson = await fetchLessonDetail(lessonId);
          setLesson(fetchedLesson);

          // Tìm topic chứa bài này
          const topic = fetchedTopics.find((t: Topic) =>
            t.lessons.some((l: Lesson) => l.id === fetchedLesson.id)
          );
          if (topic) {
            setCurrentTopic(topic);
            const complete = await checkTopicComplete(topic.id);
            console.log('Topic complete?', complete);
            console.log('checkTopicComplete result:', complete);

            setTopicComplete(complete);
          }
          console.log('Fetched lesson:', fetchedLesson);
          console.log('Topic found:', topic);

        } else {
          setLesson(null);
          setCurrentTopic(null);
          setTopicComplete(false);
        }
      } catch (err: any) {
        console.error(err);
        alert(err.message || 'Lỗi khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
      
    })();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <Spin size="large" tip="Đang tải..." fullscreen />
      </div>
    );
  }

  // Xây menu bên trái
  const sidebarItems = topics.map(topic => ({
    key: `topic-${topic.id}`,
    label: topic.name,
    children: topic.lessons.map(ls => ({
      key: `/lesson/${ls.id}`,
      label: ls.title,
    })),
  }));

  const handleCompleteAndNext = async () => {
    if (!lesson || !currentTopic) return;
    try {
      await markLessonComplete(lesson.id);
      const idx = currentTopic!.lessons.findIndex(l => l.id === lesson.id);
      const next = currentTopic!.lessons[idx + 1];
      if (next) navigate(`/lesson/${next.id}`);
      else alert('🎉 Bạn đã hoàn thành toàn bộ chủ đề này!');
    } catch {
      alert('Lỗi khi ghi nhận hoàn thành bài học.');
    }
  };

  // Issue certificate
  const handleIssueCertificate = async () => {
    if (!currentTopic) return;
    try {
      setIssuing(true);
      const url = await issueCertificate(currentTopic.id);
      setPdfUrl(url);
      setPreviewVisible(true);
    } catch (err: any) {
      alert(err.message || 'Không thể tạo chứng chỉ.');
    } finally {
      setIssuing(false);
    }
  };

  return (
    <Layout className="w-screen h-screen">
      <Sider width={250} className="bg-white border-r border-gray-200">
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={sidebarItems}
          onClick={e => navigate(e.key)}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>

      <Content className="overflow-auto p-6 lg:p-8 bg-gray-50">
        {lesson ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Tiêu đề + mô tả */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">
                {lesson.title}
              </h1>
              {/* <p className="text-sm text-gray-500 mb-4">
                Level: <span className="font-medium">{lesson.level}</span>
              </p> */}
              <p className="text-gray-700">{lesson.description}</p>
            </div>

            {/* Nội dung con */}
            <div className="space-y-10">
              {lesson.sublessons
                .sort((a, b) => a.sort_order - b.sort_order)
                .map(block => <SublessonBlock block={block} key={block.id} />)}
            </div>

            {/* Nút chức năng */}
            <div className="mt-6">
              <Space size="middle">
                {lesson.unlock_condition === 'exercise' ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate(`/lesson/${lesson.id}/exercise`)}
                  >
                    Làm bài tập
                  </Button>
                ) : (
                  <Button
                    type="default"
                    size="large"
                    onClick={handleCompleteAndNext}
                  >
                    Bài tiếp theo
                  </Button>
                )}

                {topicComplete && (
                  <Button
                    type="default"
                    icon={<Award  />}
                    onClick={handleIssueCertificate}
                    loading={issuing}
                  >
                    Nhận chứng chỉ
                  </Button>
                )}
              </Space>
              <CertificatePreviewModal
                visible={previewVisible}
                pdfUrl={pdfUrl}
                onCancel={() => setPreviewVisible(false)}
              />
            </div>
          </motion.div>
        ) : (
          <EmptyLesson onPromptSidebar={() => navigate('/lesson')} />
        )}
      </Content>
    </Layout>
  );
};

export default LessonPage;
