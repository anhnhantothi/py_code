import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavigationMenu from '../../components/navigationMenu';
import Footer from '../../components/footer';
import '../../assets/css/global.css';
import '../../assets/css/homepage.css';
import { useAuth,  } from '../../context/auth_context';
import {
  BookFilled,
  CheckCircleOutlined,
  CodeOutlined,
  VideoCameraOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { color } from 'framer-motion';



const HomePage: React.FC = () => {
  const { username, isAuthenticated } = useAuth();
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f9f9fb] text-gray-800">
      {/* Navigation */}
      <NavigationMenu />

      <div className="flex-1 overflow-auto">
        {/* Hero Section */}
        <section className="w-full min-h-screen bg-gradient-to-r from-indigo-50 to-white flex items-center">
          <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
            {/* — Text & CTA — */}
            <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Chào mừng <span style={{ color: '#4F46E5' }}>{isAuthenticated && username ? username : 'bạn'}</span> đến với Học Python Online
            </h1>
              <p className="text-lg text-gray-700">
                Trung tâm học Python trực tuyến với tài liệu, bài tập và môi trường thử nghiệm ngay trên trình duyệt.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#features"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Bắt đầu học ngay
                </a>
                <a
                  href="#trial"
                  className="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                >
                  Dùng thử miễn phí
                </a>
              </div>
              <div className="flex space-x-8 mt-8">
                <div className="flex items-center space-x-2">
                  <BookFilled className="text-indigo-600 text-xl" />
                  <span className="text-gray-700">100+ Bài tập</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleOutlined className="text-green-500 text-xl" />
                  <span className="text-gray-700">Auto-Check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CodeOutlined className="text-yellow-500 text-xl" />
                  <span className="text-gray-700">Hỗ trợ code</span>
                </div>
              </div>
            </div>

            {/* — Hình ảnh & Floating Stats — */}
            <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
              {/* Đặt ảnh vào khung tròn */}
              <div className="relative w-72 h-72 bg-green-100 rounded-full flex items-center justify-center">
                <img
                  src="https://source.unsplash.com/featured/?coding"
                  alt="Coding"
                  className="w-48 h-48 object-cover rounded-full shadow-md"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute top-10 right-0 bg-white p-3 rounded-xl shadow-lg flex items-center space-x-2">
                <VideoCameraOutlined className="text-green-500 text-xl" />
                <span className="font-medium">2K+ Video</span>
              </div>
              <div className="absolute bottom-16 left-0 bg-white p-3 rounded-xl shadow-lg flex items-center space-x-2">
                <GlobalOutlined className="text-blue-500 text-xl" />
                <span className="font-medium">5K+ Bài học</span>
              </div>
              <div className="absolute bottom-0 right-10 bg-white p-3 rounded-xl shadow-lg flex items-center space-x-2">
                <UsergroupAddOutlined className="text-purple-500 text-xl" />
                <span className="font-medium">250+ Tutor</span>
              </div>
            </div>
          </div>
        </section>
        {/* Code Runner */}
        <section className="w-full py-20 px-4 bg-white" data-aos="fade-right">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Thử gõ code ngay</h2>
              <p className="text-lg text-gray-700">
                Trải nghiệm môi trường viết code trực tuyến – không cần cài đặt gì cả!
              </p>
            </div>
            <img
              src="https://source.unsplash.com/featured/?terminal"
              alt="Code Editor"
              className="rounded-xl shadow-md flex-1"
            />
          </div>
        </section>

        {/* Features */}
        <div id="features" className="space-y-20 py-20">

          {/* Feature 1 */}
          <section className="w-full px-4" data-aos="fade-left">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <img src="https://source.unsplash.com/featured/?books" alt="Tài liệu" className="rounded-xl shadow-md" />
              <div>
                <h3 className="text-3xl font-semibold text-purple-700 mb-4">Tài liệu học tập</h3>
                <p className="text-lg text-gray-700">
                  Khám phá kho tài liệu chi tiết, dễ hiểu với ví dụ trực quan giúp bạn nắm chắc mọi kiến thức cốt lõi.
                </p>
              </div>
            </div>
          </section>

          {/* Feature 2 */}
          <section className="w-full px-4" data-aos="fade-right">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-semibold text-green-700 mb-4">Bài tập thực hành</h3>
                <p className="text-lg text-gray-700">
                  Làm bài tập tương tác với hướng dẫn chi tiết, giúp bạn tự luyện tập và phát triển tư duy.
                </p>
              </div>
              <img src="https://source.unsplash.com/featured/?assignment" alt="Bài tập" className="rounded-xl shadow-md" />
            </div>
          </section>

          {/* Feature 3 */}
          <section className="w-full px-4" data-aos="fade-up">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <img src="https://source.unsplash.com/featured/?workspace" alt="Workspace" className="rounded-xl shadow-md" />
              <div>
                <h3 className="text-3xl font-semibold text-blue-700 mb-4">Workspace Online</h3>
                <p className="text-lg text-gray-700">
                  Trình soạn thảo code thông minh, chạy được Python trực tiếp trong trình duyệt. Lưu và chia sẻ dự án dễ dàng.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Testimonials */}
        <section className="w-full py-20 testimonial-bg px-4" data-aos="zoom-in">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-10">Học viên nói gì?</h2>
            <blockquote className="italic text-lg text-gray-600">
              "Trang web học Python này thật tuyệt vời! Mình có thể học và thực hành mọi lúc, mọi nơi."
            </blockquote>
            <p className="mt-4 text-gray-700">– Nguyễn Văn A, Sinh viên CNTT</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-20 bg-white px-4" data-aos="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sẵn sàng để bắt đầu?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Hãy tham gia ngay để trải nghiệm lộ trình học Python hiện đại và bài bản nhất!
            </p>
            <a href="/register" className="btn-purple">
              Đăng ký ngay
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;