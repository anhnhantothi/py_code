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
// import GIF from '../../assets/images/code_gif.gif';

import {
  BookFilled,
  CheckCircleOutlined,
  CodeOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import TypingEffect from '../../components/TypingEffect';
import { motion } from 'framer-motion';
const typingText = [
  'Chạy code trực tiếp trên trình duyệt',
  'Trải nghiệm môi trường lập trình online',
  'Không cần cài đặt, không lo cấu hình',
].join('\n');
const testimonials = [
  {
    avatar: 'https://i.pravatar.cc/150?img=32',
    quote: 'Trang web học Python này thật tuyệt vời! Mình có thể học và thực hành mọi lúc, mọi nơi.',
    author: 'Nguyễn Văn A, Sinh viên CNTT',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote: 'Giao diện trực quan, bài tập phong phú, mình tiến bộ rõ rệt sau 1 tháng.',
    author: 'Trần Thị B, Kỹ sư phần mềm',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote: 'Tài liệu chi tiết, tương tác real-time giúp mình hiểu sâu kiến thức.',
    author: 'Lê Văn C, Developer',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=32',
    quote: 'Trang web học Python này thật tuyệt vời! Mình có thể học và thực hành mọi lúc, mọi nơi.',
    author: 'Nguyễn Văn A, Sinh viên CNTT',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote: 'Giao diện trực quan, bài tập phong phú, mình tiến bộ rõ rệt sau 1 tháng.',
    author: 'Trần Thị B, Kỹ sư phần mềm',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote: 'Tài liệu chi tiết, tương tác real-time giúp mình hiểu sâu kiến thức.',
    author: 'Lê Văn C, Developer',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=32',
    quote: 'Trang web học Python này thật tuyệt vời! Mình có thể học và thực hành mọi lúc, mọi nơi.',
    author: 'Nguyễn Văn A, Sinh viên CNTT',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote: 'Giao diện trực quan, bài tập phong phú, mình tiến bộ rõ rệt sau 1 tháng.',
    author: 'Trần Thị B, Kỹ sư phần mềm',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote: 'Tài liệu chi tiết, tương tác real-time giúp mình hiểu sâu kiến thức.',
    author: 'Lê Văn C, Developer',
  },
];

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 text-gray-700">
      <div className="flex-1 flex flex-col">
        <section
          className="relative h-screen bg-white text-gray-900 font-poppins"
        >
          {/* Decorative gradient background */}
          <div className="absolute -left-32 -top-32 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

          <div className="relative z-10 container mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 h-full px-6">
            {/* — Text & CTA — */}
            <div className="md:w-1/2 space-y-6">
              <motion.h1
                className="text-4xl md:text-5xl font-bold leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Chào mừng{' '}
                <span className="text-purple-600">
                  {isAuthenticated ? user?.full_name : 'bạn'}
                </span>{' '}
                đến với Học Python Online
              </motion.h1>

              <motion.p
                className="text-lg text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Trung tâm học Python trực tuyến với tài liệu, bài tập và môi trường thử nghiệm ngay trên trình duyệt.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="#features"
                  whileHover={{ scale: 1.05 }}
                  className="
                inline-block px-6 py-3
                bg-white
                border-2 border-purple-200
                text-purple-600
                font-semibold rounded-lg
                shadow-sm
                transition
                hover:bg-purple-50
              "
                ><b>🚀Bắt đầu học ngay</b>

                </motion.a>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-8 mt-8 text-base text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center space-x-2">
                  <BookFilled className="text-purple-600 text-xl" />
                  <span>100+ Bài tập</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-purple-600 text-xl" />
                  <span>Auto-Check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CodeOutlined className="text-purple-600 text-xl" />
                  <span>Hỗ trợ code</span>
                </div>
              </motion.div>
            </div>

            {/* — Ảnh & Badges — */}
            <div className="md:w-1/2 relative flex justify-center">
              <motion.div
                className="rounded-full bg-white p-2 shadow-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <img
                  src={AIImage}
                  alt="Coding AI"
                  className="w-64 h-64 object-cover rounded-full"
                />
              </motion.div>

              {/** Floating badges **/}
              <motion.div
                className="absolute top-4 right-0 bg-white rounded-xl px-4 py-2 flex items-center space-x-2 shadow"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <CommentOutlined className="text-purple-600 text-xl" />
                <span className="text-gray-700">2K+ Phản hồi</span>
              </motion.div>

              <motion.div
                className="absolute bottom-16 left-0 bg-white rounded-xl px-4 py-2 flex items-center space-x-2 shadow"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <GlobalOutlined className="text-purple-600 text-xl" />
                <span className="text-gray-700">5K+ Bài học</span>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-10 bg-white rounded-xl px-4 py-2 flex items-center space-x-2 shadow"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <UsergroupAddOutlined className="text-purple-600 text-xl" />
                <span className="text-gray-700">250+ Tutor</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* — Code Window & Features — */}
        <section
          className="relative py-16 bg-white-200 text-gray-900 font-poppins "
          data-aos="fade-right"
        >
          {/* 👇 2 blob tím nhạt rất subtle */}
          <div className="absolute -left-24 -top-24 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

          <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
            {/* ← Code Window */}
            <div className="bg-white border border-purple-100 rounded-2xl shadow p-1">
              {/* Title bar */}
              <div className="flex items-center px-4 py-2 bg-purple-100 rounded-t-xl">
                <span className="h-3 w-3 bg-red-400 rounded-full mr-2"></span>
                <span className="h-3 w-3 bg-yellow-300 rounded-full mr-2"></span>
                <span className="h-3 w-3 bg-green-300 rounded-full"></span>
                <span className="ml-auto text-sm text-purple-600 font-mono">Playground.tsx</span>
              </div>
              {/* Code area */}
              <div className="bg-white p-6 font-mono text-purple-600 whitespace-pre-wrap min-h-[240px] rounded-b-xl">
                <TypingEffect text={typingText} speed={80} pause={1200} />
              </div>
            </div>

            {/* → Workspace image */}
            <div className="rounded-2xl overflow-hidden shadow border border-purple-100">
              <img
                src={Workspace}
                alt="Online Code Editor"
                className="w-full h-[320px] object-cover"
              />
            </div>
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

<section className="py-16 bg-white overflow-visible h-[600px]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-12 text-center">Học viên nói gì?</h2>

        {/* wrapper  */}
        <div className="overflow-x-auto overflow-y-visible hide-scrollbar pt-16">
          <div className="flex space-x-6 pb-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg p-6 pt-16 relative overflow-visible transform transition hover:scale-105"
              >
                {/* avatar */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                </div>

                {/* nội dung */}
                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                <p className="font-semibold text-gray-900">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
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