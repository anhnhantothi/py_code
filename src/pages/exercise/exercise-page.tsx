// File: src/pages/ExercisePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Alert, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PythonRunner from '../../components/PythonRunner';
import { fetchExercise, Exercise, submitExercise } from '../../services/exerciseService';
import CommentSection from '../../components/CommentArea';

const ExercisePage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCode, setUserCode] = useState('');
  const [runnerOutput, setRunnerOutput] = useState('');
  const [result, setResult] = useState<null | 'success' | 'fail'>(null);

  useEffect(() => {
    const loadExercise = async () => {
      setLoading(true);
      try {
        const data = await fetchExercise(lessonId!);
        setExercise(data);
        setUserCode(data.initial_code || '');
      } catch (error) {
        console.error(error);
        message.error('Lỗi khi tải bài tập.');
      } finally {
        setLoading(false);
      }
    };
    loadExercise();
  }, [lessonId]);

  const handleSubmit = async () => {
    
    if (!runnerOutput.trim()) {
      return message.warning('⚠️ Vui lòng chạy code trước khi nộp bài.');
    }
  
    if (!exercise) return;
    
    try {
      console.log('Submitting code:', userCode);
      const result = await submitExercise(exercise.id, userCode);
      if (result.correct) {
        setResult('success');
        message.success('✅ Chính xác!');
      } else {
        setResult('fail');
        message.error('❌ Sai rồi, thử lại nhé!');
      }
    } catch (err) {
      console.error(err);
      message.error('Đã xảy ra lỗi khi nộp bài.');
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spin size="large" tip="Đang tải bài tập..." />
      </div>
    );
  }

  if (!exercise) {
    return <div className="text-center text-gray-500 mt-10">Không tìm thấy bài tập.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={10}>
            <Card
              title={
                <div className="flex items-center space-x-2">
                  <ArrowLeftOutlined
                    onClick={() => navigate(-1)}
                    className="text-indigo-500 cursor-pointer"
                  />
                  <span className="text-lg font-semibold">📝 Bài Tập</span>
                </div>
              }
              // headStyle={{ borderBottom: 'none' }}
              styles={{
                header: { borderBottom: 'none' },
                body: { padding: '1.5rem' }
              }}
              className="rounded-xl shadow-md"
            >
              <h2 className="text-indigo-600 text-xl font-semibold mb-2">
                {exercise.title}
              </h2>
              <p className="text-gray-600 mb-4">{exercise.description}</p>

              {result && (
                <div className="mt-6">
                  {result === 'success' ? (
                    <Alert message="🎉 Chính xác! Bạn đã hoàn thành." type="success" showIcon />
                  ) : (
                    <Alert message="❌ Sai rồi. Hãy thử lại nhé." type="error" showIcon />
                  )}
                </div>
              )}
            </Card>
            {/* <div className='pt-5'><CommentSection/></div> */}
          </Col>

          <Col xs={24} md={14}>
            <Card
              title="💻 Trình Soạn Thảo Code"
              styles={{
                header: { borderBottom: 'none' , fontSize: '1.1rem' },
                body: { padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }
              }}
              className="rounded-xl shadow-md"
            >
              <div className="flex-1 overflow-auto mb-4">
                <PythonRunner
                  initialCode={userCode}
                  onChange={setUserCode}
                  onOutput={setRunnerOutput}
                />
              </div>
              <div className="text-right">
                <Button type="primary" size="large" onClick={handleSubmit}>
                  Nộp bài
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default ExercisePage;
