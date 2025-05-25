import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPractices } from '../../services/practiceService';
import { motion } from 'framer-motion';
import { Button } from 'primereact/button';

const PracticeProgress: React.FC = () => {
  const [practices, setPractices] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPractices()
      .then(setPractices)
      .catch(() => console.error("Không thể tải danh sách bài tập"));
  }, []);

  const done = practices.filter(p => p.isCompleted).length;
  const total = practices.length;
  const notDone = total - done;

  const donePercent = total > 0 ? (done / total) * 100 : 0;
  const notDonePercent = 100 - donePercent;

  return (
    <motion.div
      className="mt-10 bg-white rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-1 flex items-center">
        <span className="mr-2 text-pink-500 text-3xl">🧠</span>
        Tiến độ hoàn thành bài tập thực hành
      </h3>

      <div className="flex justify-between items-center mt-2 mb-4">
        <p className="text-sm text-gray-600">
          {done}/{total} bài đã hoàn thành
        </p>
        <Button
          label={isExpanded ? 'Ẩn danh sách' : 'Xem chi tiết'}
          className="p-button-sm p-button-outlined text-indigo-600 border-indigo-300"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4 flex">
        <div
          className="bg-green-500"
          style={{ width: `${donePercent}%` }}
          title={`${done}/${total} đã hoàn thành`}
        ></div>
        <div
          className="bg-yellow-400"
          style={{ width: `${notDonePercent}%` }}
          title={`${notDone}/${total} chưa làm`}
        ></div>
      </div>

      {isExpanded && (
        <ul className="space-y-2">
          {practices.map((p) => (
            <li
              key={p.slug}
              onClick={() => navigate(`/practice/${p.slug}`)}
              className="flex justify-between items-center bg-gray-50 hover:bg-indigo-50 p-3 rounded-lg cursor-pointer"
            >
              <span className="font-medium">🔹 {p.title}</span>
              {p.isCompleted ? (
                <span className="text-green-600 text-sm font-semibold">✅ Đã làm</span>
              ) : (
                <span className="text-yellow-500 text-sm">⏳ Chưa làm</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default PracticeProgress;
