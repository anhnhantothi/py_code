// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../assets/css/global.css';
import '../../assets/css/homepage.css';
import { useAuth } from '../../contexts/auth_context';
import AIImage from '../../assets/images/AI-pic.jpg';
import CodeEditor from '../../assets/images/code-editor.jpg';
import LearnCode from '../../assets/images/learn-code.jpg';
import Workspace from '../../assets/images/wsp.gif';
import WSP from '../../assets/images/wsp.jpg';


import {
  BookFilled,
  CheckCircleOutlined,
  CodeOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
} from '@ant-design/icons';

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 text-gray-700">
      <div className="flex-1 overflow-auto">
        {/* Hero Section (giữ nguyên như cũ) */}
        <section className="w-full min-h-screen bg-gradient-to-r from-indigo-50 to-white flex items-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
            {/* — Text & CTA — */}
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Chào mừng{' '}
                <span style={{ color: '#4F46E5' }}>
                  {isAuthenticated}
                </span>{' '}
               {user?.fullName ?? "bạn"} đến với Học Python Online
              </h1>
              <p className="text-lg text-gray-700">
                Trung tâm học Python trực tuyến với tài liệu, bài tập và môi trường thử nghiệm ngay trên
                trình duyệt.
              </p>
              <div className="flex space-x-4">
                <a href="#features" className="btn-primary">
                  Bắt đầu học ngay
                </a>
                <a href="#trial" className="btn-secondary">
                  Dùng thử miễn phí
                </a>
              </div>
              <div className="flex space-x-8 mt-8">
                <div className="flex items-center space-x-2">
                  <BookFilled className="text-indigo-600 text-xl" />
                  <span className="text-gray-700">100+ Bài tập</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-indigo-600 text-xl" />
                  <span className="text-gray-700">Auto-Check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CodeOutlined className="text-indigo-600 text-xl" />
                  <span className="text-gray-700">Hỗ trợ code</span>
                </div>
              </div>
            </div>
            {/* — Hình ảnh & Floating Stats — */}
            <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
              <div className="relative w-72 h-72 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <img
                  src={AIImage}
                  alt="Coding"
                  className="w-48 h-48 object-cover rounded-2xl shadow-md"
                />
              </div>
              <div className="absolute top-10 right-0 card">
                <CommentOutlined className="text-indigo-600 text-xl" />
                <span className="font-medium text-gray-700">2K+ Phản hồi</span>
              </div>
              <div className="absolute bottom-16 left-0 card">
                <GlobalOutlined className="text-indigo-600 text-xl" />
                <span className="font-medium text-gray-700">5K+ Bài học</span>
              </div>
              <div className="absolute bottom-0 right-10 card">
                <UsergroupAddOutlined className="text-indigo-600 text-xl" />
                <span className="font-medium text-gray-700">250+ Tutor</span>
              </div>
            </div>
          </div>
        </section>

        {/* Code Runner */}
        <section className="section bg-white" data-aos="fade-right">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 leading-tight">Thử gõ code ngay</h2>
              <p className="text-lg leading-relaxed mb-8">
                Trải nghiệm môi trường viết code trực tuyến – không cần cài đặt gì cả!
              </p>
            </div>
            <img
              src={Workspace}
              alt="Code Editor"
              className="rounded-2xl shadow-md flex-1 h-[300px]"
            />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section bg-gray-100">
          {/* Feature 1 */}
          <div
            className="max-w-7xl mx-auto mb-8 bg-white rounded-2xl shadow-md px-6 py-10"
            data-aos="fade-left"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <img
                src={LearnCode}
                alt="Tài liệu"
                className="rounded-2xl shadow-md w-full h-[300px]"
              />
              <div>
                <h3 className="text-3xl font-semibold text-indigo-600 mb-4">Tài liệu học tập</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Khám phá kho tài liệu chi tiết, dễ hiểu với ví dụ trực quan giúp bạn nắm chắc mọi kiến thức
                  cốt lõi.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="max-w-7xl mx-auto mb-8 bg-white rounded-2xl shadow-md px-6 py-10"
            data-aos="fade-right"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-semibold text-indigo-600 mb-4">Bài tập thực hành</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Làm bài tập tương tác với hướng dẫn chi tiết, giúp bạn tự luyện tập và phát triển tư duy.
                </p>
              </div>
              <img
                src={CodeEditor}
                alt="Bài tập"
                className="rounded-2xl shadow-md w-full"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="max-w-7xl mx-auto mb-8 bg-white rounded-2xl shadow-md px-6 py-10"
            data-aos="fade-up"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <img
                src={WSP}
                alt="Workspace"
                className="rounded-2xl shadow-md w-full h-[350px]"
              />
              <div>
                <h3 className="text-3xl font-semibold text-indigo-600 mb-4">Workspace Online</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Trình soạn thảo code thông minh, chạy được Python trực tiếp trong trình duyệt. Lưu và chia sẻ dự án
                  dễ dàng.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section bg-white" data-aos="zoom-in">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8">Học viên nói gì?</h2>
            <blockquote className="italic text-lg leading-relaxed mb-4">
              "Trang web học Python này thật tuyệt vời! Mình có thể học và thực hành mọi lúc, mọi nơi."
            </blockquote>
            <p>– Nguyễn Văn A, Sinh viên CNTT</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section bg-gray-100" data-aos="fade-up">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-4 leading-tight">Sẵn sàng để bắt đầu?</h2>
            <p className="text-lg leading-relaxed mb-6">
              Hãy tham gia ngay để trải nghiệm lộ trình học Python hiện đại và bài bản nhất!
            </p>
            <a href="/register" className="btn-primary">
              Đăng ký ngay
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
    </div>
  );
};

export default HomePage;