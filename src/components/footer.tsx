import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <footer className="relative bg-gradient-to-tr from-indigo-50 to-purple-50 pt-12">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Logo & Description + Social */}
        <div className="space-y-4">
          <img src={Logo} alt="Logo" className="h-14 mb-2" />
          <p className="text-gray-700 leading-relaxed">
            Pylap App là nền tảng học Python trực tuyến, cho phép bạn đọc tài liệu, làm bài tập và thử nghiệm code ngay trên trình duyệt mà không cần cài đặt.
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              { icon: <FaFacebookF />, color: 'text-blue-600', hover: 'hover:text-blue-800' },
              { icon: <FaYoutube />, color: 'text-red-600', hover: 'hover:text-red-800' },
              { icon: <FaTwitter />, color: 'text-sky-400', hover: 'hover:text-sky-600' },
              { icon: <FaInstagram />, color: 'text-pink-500', hover: 'hover:text-pink-700' },
            ].map((s, i) => (
              <motion.a
                key={i}
                href="#"
                className={`${s.color} ${s.hover} text-xl`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Liên kết nhanh</h3>
          <ul className="space-y-2 text-gray-700">
            {[
              { to: '/', label: 'Trang Chủ' },
              { to: '/lesson', label: 'Bài học' },
              { to: '/practice', label: 'Thực hành' },
              { to: '/workspace', label: 'Workspace' },
            ].map((link, idx) => (
              <li key={idx}>
                <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                  <Link to={link.to} className="hover:text-indigo-700">
                    {link.label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Liên hệ</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="mt-1 text-indigo-500 text-lg" />
              <span>567 Lê Duẩn, Phường EaTam, Thành phố Buôn Ma Thuột, Đăk Lăk</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-indigo-500 text-lg" />
              <span>1900.123.456 (8h30–21h T2–T6, 8h30–11h30 T7)</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-indigo-500 text-lg" />
              <span>anhnhantothi03@gmai.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-white text-sm">
          <div className="flex items-center space-x-3 mb-2 md:mb-0">
            <img src={CopyrightLogo} alt="©" className="h-5 w-auto animate-spin-slow" />
            <span>Pylap App © 2025. All rights reserved.</span>
          </div>
          <div className="space-x-4">
            <Link to="#" className="hover:underline">
              Chính sách bảo mật
            </Link>
            <Link to="#" className="hover:underline">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
