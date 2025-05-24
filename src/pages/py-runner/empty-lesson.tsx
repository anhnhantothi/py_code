// src/components/EmptyLesson.tsx
import { SiPython } from 'react-icons/si';
import { FaCheckCircle } from 'react-icons/fa';
import { CodeOutlined, DatabaseOutlined, SyncOutlined, FunctionOutlined } from '@ant-design/icons';
import '@fontsource/poppins';

interface Props { onPromptSidebar: () => void; }

const outcomes = [
  'Hiểu cú pháp cơ bản của Python',
  'In thông điệp “Hello, Python!”',
  'Phát triển tư duy giải thuật',
  'Sẵn sàng với dự án thực tế',
];

const topicsList = [
  { icon: <CodeOutlined className="text-2xl" />, label: 'Biến & Kiểu dữ liệu' },
  { icon: <DatabaseOutlined className="text-2xl" />, label: 'Cấu trúc điều kiện' },
  { icon: <SyncOutlined className="text-2xl" />, label: 'Vòng lặp' },
  { icon: <FunctionOutlined className="text-2xl" />, label: 'Hàm & Module' },
    { icon: <CodeOutlined className="text-2xl" />, label: 'Biến & Kiểu dữ liệu' },
  { icon: <DatabaseOutlined className="text-2xl" />, label: 'Cấu trúc điều kiện' },
  { icon: <SyncOutlined className="text-2xl" />, label: 'Vòng lặp' },
  { icon: <FunctionOutlined className="text-2xl" />, label: 'Hàm & Module' },

    { icon: <CodeOutlined className="text-2xl" />, label: 'Biến & Kiểu dữ liệu' },
  { icon: <DatabaseOutlined className="text-2xl" />, label: 'Cấu trúc điều kiện' },
  { icon: <SyncOutlined className="text-2xl" />, label: 'Vòng lặp' },
  { icon: <FunctionOutlined className="text-2xl" />, label: 'Hàm & Module' },

];

export default function EmptyLesson({ onPromptSidebar }: Props) {
  return (
    <div className="font-poppins text-gray-800">

      {/* Hero */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <SiPython className="text-7xl text-indigo-500 mx-auto md:mx-0" />
            <h1 className="text-4xl font-bold">
              Chào mừng đến với <span className="text-indigo-500">Python Course</span>!
            </h1>
            <p className="text-lg text-gray-600">
              Học Python từ những bước đầu tiên đến áp dụng giải quyết bài toán thực tế.
            </p>
            <button
              onClick={onPromptSidebar}
              className="
                inline-block px-8 py-3
                bg-indigo-500 text-white
                font-medium rounded-lg
                hover:bg-indigo-600 transition
              "
            >
              Bắt đầu ngay
            </button>
          </div>
          {/* Graphic (ảnh hoặc illustration) */}
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-indigo-50 rounded-full flex items-center justify-center shadow-lg">
              <SiPython className="text-8xl text-indigo-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Sau khi hoàn thành, bạn sẽ:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {outcomes.map((o, i) => (
              <div
                key={i}
                className="
                  flex items-start space-x-4
                  bg-white p-6 rounded-xl shadow
                  hover:shadow-lg transition
                "
              >
                <FaCheckCircle className="text-green-500 text-xl mt-1" />
                <p>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">Các chủ đề chính:</h2>
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex space-x-4">
              {topicsList.map((t) => (
                <div
                  key={t.label}
                  onClick={onPromptSidebar}
                  className="
                    flex-shrink-0 w-48 p-4
                    bg-indigo-50 rounded-xl
                    text-center cursor-pointer
                    hover:bg-indigo-100 transition
                  "
                >
                  <div className="text-indigo-500 mb-2">{t.icon}</div>
                  <div className="font-medium">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-white text-2xl font-semibold mb-6">
            Sẵn sàng bắt đầu hành trình Python?
          </h3>
          <button
            onClick={onPromptSidebar}
            className="
              inline-block px-8 py-3
              bg-white text-indigo-600
              font-medium rounded-lg
              hover:bg-gray-100 transition
            "
          >
            Chọn bài học ngay
          </button>
        </div>
      </section>
    </div>
  );
}
