import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PythonRunner from '../../components/PythonRunner';

const correctOutput = 'Hello, world!';

const ExercisePage: React.FC = () => {
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState('');
  const [runnerOutput, setRunnerOutput] = useState('');
  const [result, setResult] = useState<null | 'success' | 'fail'>(null);

  const handleSubmit = () => {
    if (!runnerOutput.trim()) {
      return message.warning('⚠️ Vui lòng chạy code trước khi nộp bài.');
    }
    if (runnerOutput.trim() === correctOutput) {
      setResult('success');
      message.success('✅ Chính xác!');
    } else {
      setResult('fail');
      message.error('❌ Sai rồi, thử lại nhé!');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Row gutter={[24, 24]}>
          {/* ———————————————— */}
          {/* CỘT TRÁI: ĐỀ BÀI */}
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
              headStyle={{ borderBottom: 'none' }}
              bodyStyle={{ padding: '1.5rem' }}
              className="rounded-xl shadow-md"
            >
              <h2 className="text-indigo-600 text-xl font-semibold mb-2">
                In ra "Hello, world!"
              </h2>
              <p className="text-gray-600 mb-4">
                Viết chương trình Python để in ra đúng dòng chữ sau:
              </p>
              <pre className="bg-gray-100 border border-gray-200 rounded-md p-4 font-mono text-sm">
                Hello, world!
              </pre>

              {result && (
                <div className="mt-6">
                  {result === 'success' ? (
                    <Alert
                      message="🎉 Chính xác! Bạn đã hoàn thành."
                      type="success"
                      showIcon
                    />
                  ) : (
                    <Alert
                      message="❌ Sai rồi. Hãy thử lại nhé."
                      type="error"
                      showIcon
                    />
                  )}
                </div>
              )}
            </Card>
          </Col>

          {/* ———————————————— */}
          {/* CỘT PHẢI: CODE EDITOR + NÚT NỘP */}
          <Col xs={24} md={14}>
            <Card
              title="💻 Trình Soạn Thảo Code"
              headStyle={{ borderBottom: 'none', fontSize: '1.1rem' }}
              bodyStyle={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }}
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
