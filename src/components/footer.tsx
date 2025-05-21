// File: src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Logo from '../assets/images/logo_py.png';
import CopyrightLogo from '../assets/images/Logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      {/* Top grid */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo & Mô tả + Social */}
        <div>
          <img src={Logo} alt="Logo" className="h-12 mb-4" />
          <p className="text-gray-600 mb-4">
            Pylap App là nền tảng học Python trực tuyến, cho phép bạn đọc tài liệu,
            làm bài tập và thử nghiệm code ngay trên trình duyệt mà không cần cài đặt.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebookF /></a>
            <a href="#" className="text-red-600 hover:text-red-800"><FaYoutube /></a>
            <a href="#" className="text-sky-400 hover:text-sky-600"><FaTwitter /></a>
            <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram /></a>
          </div>
        </div>

        {/* Column 2: Liên kết nhanh */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-gray-800">Trang Chủ</Link></li>
            <li><Link to="/lesson" className="hover:text-gray-800">Bài học</Link></li>
            <li><Link to="/practice" className="hover:text-gray-800">Thực hành</Link></li>
            <li><Link to="/workspace" className="hover:text-gray-800">Workspace</Link></li>
          </ul>
        </div>

        {/* Column 3: Thông tin liên hệ */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Liên hệ</h3>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-2" />
              <span>
                Số 10, Phạm Văn Bạch, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội
              </span>
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              <span>1900.123.456 (8h30–21h T2–T6, 8h30–11h30 T7)</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>support@pylapapp.io</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-white text-sm">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <img src={CopyrightLogo} alt="©" className="h-5 w-auto" />
            <span>Pylap App © 2025. All rights reserved.</span>
          </div>
          <div className="space-x-4">
            <Link to="/privacy" className="hover:underline">Chính sách bảo mật</Link>
            <Link to="/terms" className="hover:underline">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
