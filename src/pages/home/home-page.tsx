import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavigationMenu from '../../components/navigationMenu';
import Footer from '../../components/footer';
import '../../assets/css/global.css';
import '../../assets/css/homepage.css';

const HomePage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f9f9fb] text-gray-800">
      {/* Navigation */}
      <NavigationMenu />

      <div className="flex-1 overflow-auto">
        {/* Hero Section */}
        <section className="w-full h-screen flex items-center justify-center px-8 hero-bg">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center p-8 rounded-xl glass-box" data-aos="fade-down">
            <img
              src="https://source.unsplash.com/featured/?coding"
              alt="Welcome"
              className="rounded-xl shadow-md w-full h-auto object-cover"
            />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Chào mừng đến với Học Python Online</h1>
              <p className="text-lg mb-6">
                Trung tâm học Python trực tuyến với tài liệu, bài tập và môi trường thử nghiệm ngay trên trình duyệt.
              </p>
              <a href="#features" className="btn-purple">
                Bắt đầu học ngay
              </a>
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