// File: src/components/EmptyLesson.tsx
import React from 'react';
import { Button, List, Timeline, Typography } from 'antd';
import {
  BookFilled,
  CheckCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  SyncOutlined,
  FunctionOutlined,
} from '@ant-design/icons';

interface Props {
  /** Gọi khi người dùng click vào nút bắt đầu hoặc placeholder */
  onPromptSidebar: () => void;
}

const outcomes = [
  'Hiểu được cú pháp cơ bản của Python',
  'Viết chương trình in ra thông điệp đầu tiên',
  'Nâng cao tư duy logic và kỹ năng giải thuật cơ bản',
  'Chuẩn bị sẵn sàng cho các bài tập nâng cao và dự án thực tế',
];

const topicsList = [
  { icon: <CodeOutlined style={{ fontSize: 28, color: '#4F46E5' }} />, label: 'Biến và Kiểu dữ liệu' },
  { icon: <DatabaseOutlined style={{ fontSize: 28, color: '#4F46E5' }} />, label: 'Cấu trúc điều kiện' },
  { icon: <SyncOutlined style={{ fontSize: 28, color: '#4F46E5' }} />, label: 'Vòng lặp và lặp' },
  { icon: <FunctionOutlined style={{ fontSize: 28, color: '#4F46E5' }} />, label: 'Hàm và Module' },
];

const EmptyLesson: React.FC<Props> = ({ onPromptSidebar }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <BookFilled className="mx-auto text-6xl text-indigo-600" />
          <Typography.Title level={1} className="mt-6 text-gray-900">
            Chào mừng đến với Python Course!
          </Typography.Title>
          <Typography.Paragraph className="mt-4 text-lg text-gray-600">
            Khám phá Python từng bước: từ in thông điệp đầu tiên đến giải quyết bài toán thực tiễn.
          </Typography.Paragraph>
          <Button
            type="primary"
            size="large"
            className="mt-8"
            onClick={onPromptSidebar}
          >
            Bắt đầu ngay
          </Button>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Typography.Title level={2} className="text-gray-800 mb-6 text-center">
          Sau khi hoàn thành, bạn sẽ:
        </Typography.Title>
        <Timeline mode="left">
          {outcomes.map((item, idx) => (
            <Timeline.Item
              key={idx}
              dot={<CheckCircleOutlined style={{ fontSize: '16px', color: '#52c41a' }} />}
            >
              <Typography.Text className="text-gray-700">{item}</Typography.Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </section>

      {/* Topics Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <Typography.Title level={2} className="text-gray-800 mb-6">
            Các chủ đề chính bạn sẽ học:
          </Typography.Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topicsList.map((topic) => (
              <div
                key={topic.label}
                className="flex flex-col items-center p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                onClick={onPromptSidebar}
              >
                {topic.icon}
                <Typography.Text className="mt-3 font-medium text-gray-700">
                  {topic.label}
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-indigo-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <Typography.Title level={3} className="text-white">
            Sẵn sàng bắt đầu hành trình Python của bạn?
          </Typography.Title>
          <Button
            type="primary"
            size="large"
            onClick={onPromptSidebar}
          >
            Chọn bài học ngay
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EmptyLesson;
