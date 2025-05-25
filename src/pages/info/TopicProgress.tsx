import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useToast } from "../../contexts/ToastContext";
import {
    checkTopicComplete,
    fetchTopics,
    issueCertificate,
} from "../../services/lessonService";
import { motion } from "framer-motion";
import { fetchLessonsByTopic, fetchLessonStatus } from "./fetchLesson";

const TopicList: React.FC = () => {
    const [topics, setTopics] = useState<any[]>([]);
    const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});
    const [expandedTopics, setExpandedTopics] = useState<number[]>([]);
    const [lessonsMap, setLessonsMap] = useState<Record<number, any[]>>({});
    const [lessonStatusMap, setLessonStatusMap] = useState<Record<number, boolean>>({});
    const [progressSummaryMap, setProgressSummaryMap] = useState<Record<number, string>>({});
    const [overallDone, setOverallDone] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const toast = useToast();

    useEffect(() => {
        fetchTopics()
            .then(async (data) => {
                setTopics(data);
                const statuses = await Promise.all(
                    data.map((topic: any) => checkTopicComplete(topic.id).catch(() => false))
                );
                const map: Record<number, boolean> = {};
                data.forEach((topic: any, idx: number) => {
                    map[topic.id] = statuses[idx];
                });
                setCompletedMap(map);
                setOverallDone(statuses.filter(Boolean).length);
            })
            .catch(() => toast.showError("Không thể tải danh sách chủ đề"));
    }, [toast]);

    const handleIssueCertificate = async (topicId: number) => {
        try {
            const url = await issueCertificate(topicId);
            window.open(url, "_blank");
        } catch (err: any) {
            toast.showError(err.message || "Không thể cấp chứng chỉ");
        }
    };

    const toggleLessons = async (topicId: number) => {
        if (expandedTopics.includes(topicId)) {
            setExpandedTopics(expandedTopics.filter(id => id !== topicId));
        } else {
            if (!lessonsMap[topicId]) {
                try {
                    const lessons = await fetchLessonsByTopic(topicId);
                    setLessonsMap(prev => ({ ...prev, [topicId]: lessons }));

                    const statusEntries = await Promise.all(
                        lessons.map(async (lesson: any) => {
                            const completed = await fetchLessonStatus(lesson.id).catch(() => false);
                            return [lesson.id, completed];
                        })
                    );
                    setLessonStatusMap(prev => ({ ...prev, ...Object.fromEntries(statusEntries) }));

                    const completedCount = statusEntries.filter(([_, v]) => v).length;
                    const total = lessons.length;
                    setProgressSummaryMap(prev => ({
                        ...prev,
                        [topicId]: `${completedCount}/${total} bài đã hoàn thành`
                    }));

                } catch (err: any) {
                    toast.showError("Không thể tải bài học");
                }
            }
            setExpandedTopics(prev => [...prev, topicId]);
        }
    };

    return (
        <motion.div
            className="bg-white mt-10 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <span className="mr-2 text-indigo-600 text-3xl">📚</span>
                Tiến độ hoàn thành bài học
            </h3>

            {topics.length > 0 && (
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-gray-600">
                            Tổng chủ đề đã hoàn thành: {overallDone}/{topics.length}
                        </p>
                        <Button
                            label={showDetails ? "Ẩn chi tiết" : "Xem chi tiết"}
                            className="p-button-text p-button-sm text-indigo-600"
                            onClick={() => setShowDetails(!showDetails)}
                        />
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                        <div
                            className="bg-green-500"
                            style={{ width: `${(overallDone / topics.length) * 100}%` }}
                            title={`${overallDone}/${topics.length} đã hoàn thành`}
                        ></div>
                        <div
                            className="bg-yellow-400"
                            style={{ width: `${100 - (overallDone / topics.length) * 100}%` }}
                            title={`${topics.length - overallDone} chưa hoàn thành`}
                        ></div>
                    </div>
                </div>
            )}

            {showDetails && (
                <ul className="flex flex-col space-y-4">
                    {topics.map((topic) => (
                        <motion.li
                            key={topic.id}
                            className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:shadow transition-all"
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="flex justify-between items-center">
                                <div className="w-full">
                                    <p className="text-lg font-semibold text-gray-900 mb-1">{topic.name}</p>
                                    <p className="text-sm text-indigo-500 font-medium mt-1">
                                        {progressSummaryMap[topic.id]}
                                    </p>
                                    {progressSummaryMap[topic.id] && (() => {
                                        const [done, total] = progressSummaryMap[topic.id].split(' ')[0].split('/').map(Number);
                                        const percent = (done / total) * 100;
                                        return (
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                                                <div
                                                    className="h-full bg-green-500"
                                                    style={{ width: `${percent}%` }}
                                                    title={`Tiến độ: ${done}/${total}`}
                                                ></div>
                                            </div>
                                        );
                                    })()}
                                    <p className={`text-sm mt-1 ${completedMap[topic.id] ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {completedMap[topic.id] ? '✅ Đã hoàn thành' : '⏳ Chưa hoàn thành'}
                                    </p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <Button
                                        label={expandedTopics.includes(topic.id) ? "Ẩn bài học" : "Xem chi tiết"}
                                        icon="pi pi-eye"
                                        className="p-button-sm p-button-outlined text-indigo-600 border-indigo-200 w-[200px]"
                                        onClick={() => toggleLessons(topic.id)}
                                    />
                                    {completedMap[topic.id] && (
                                        <Button
                                            label="Xem chứng chỉ"
                                            icon="pi pi-file-pdf"
                                            className="p-button-sm p-button-outlined text-indigo-600 border-indigo-300 w-[200px]"
                                            onClick={() => handleIssueCertificate(topic.id)}
                                        />
                                    )}
                                </div>
                            </div>

                            {expandedTopics.includes(topic.id) && (
                                <div className="mt-4 pl-4 border-l-4 border-indigo-200">
                                    {lessonsMap[topic.id]?.length > 0 ? (
                                        <ul className="space-y-2">
                                            {lessonsMap[topic.id].map((lesson) => (
                                                <li
                                                    key={lesson.id}
                                                    onClick={() => window.location.href = `/lesson/${lesson.id}`}
                                                    className="text-sm text-gray-800 p-2 rounded hover:bg-indigo-50 cursor-pointer flex items-center justify-between"
                                                >
                                                    <span>
                                                        🔹 {lesson.title}
                                                        {lessonStatusMap[lesson.id] && (
                                                            <span className="ml-2 text-green-500 text-xs font-medium">✅ Đã học</span>
                                                        )}
                                                    </span>
                                                    {lesson.has_exercise && (
                                                        <span className="text-xs text-red-500 ml-2 font-medium">Có bài tập</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">Không có bài học nào.</p>
                                    )}
                                </div>
                            )}
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
};

export default TopicList;
