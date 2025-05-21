import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import LessonEditor from './lesson-editor';
import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';



export async function saveOrUpdateTopic(topicData:any) {
  try {
    const isUpdate = !!topicData.id;

    const url = isUpdate
      ? `http://localhost:5000/api/topic/${topicData.id}`
      : 'http://localhost:5000/api/topic';

    const method = isUpdate ? 'put' : 'post';
    const token = localStorage.getItem("token");

    const response = await axios({
      method,
      url,
      data: topicData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lưu topic:',error);
    throw error;
  }
}



export interface Sublesson {
  id: number | null;
  type: 'title' | 'text' | 'cmd' | 'example';
  content: string;
  sort_order: number;
}


export interface Lesson {
  id: number;
  title: string;
  level: string;
  description: string;
  unlock_condition: 'read' | 'exercise';
  sublessons: Sublesson[];
  exercise: any;
}

export interface Topic {
  id: number | null;
  name: string;
  sort_order: number;
  lessons: Lesson[];
}

export default function LessonDetail() {
  const [topic, setTopic] = useState<Topic>();
  const location = useLocation();
    const toast = useToast();

  useEffect(() => {
    const state = location.state as Topic;
    setTopic(state);
  }, [location.state]);

  const handleAddLesson = () => {
    if (!topic) return;
    const newLesson: Lesson = {
        id: Date.now(),
        title: '',
        level: '',
        description: '',
        unlock_condition: 'read',
        sublessons: [],
        exercise: undefined
    };
    setTopic({ ...topic, lessons: [...topic.lessons, newLesson] });
  };

  
  const handleSave = () => {
    if (!topic) return;
    saveOrUpdateTopic(topic).then((response) => {
     toast.showSuccess("Lưu thành công");
    }).catch((error) => {
      console.error(error);
    }); 
  };
  const handleDeleteLesson = (index: number) => {
    if (!topic) return;
    const newLessons = [...topic.lessons];
    newLessons.splice(index, 1);
    setTopic({ ...topic, lessons: newLessons });
  };

  const handleChangeTopicName = (name: string) => {
    if (!topic) return;
    setTopic({ ...topic, name });
  };

  const handleChangeSortOrder = (sort_order: number) => {
    if (!topic) return;
    setTopic({ ...topic, sort_order });
  };

  const handleChangeLessonTitle = (index: number, title: string) => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    lessons[index].title = title;
    setTopic({ ...topic, lessons });
  };

  const handleChangeLessonLevel = (index: number, level: string) => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    lessons[index].level = level;
    setTopic({ ...topic, lessons });
  };

  const handleChangeLessonDescription = (index: number, description: string) => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    lessons[index].description = description;
    setTopic({ ...topic, lessons });
  };

  const handleAddSublesson = (lessonIdx: number) => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    const sublessons = lessons[lessonIdx].sublessons;
    sublessons.push({
      id: null,
      type: 'text',
      content: '',
      sort_order: sublessons.length + 1,
    });
    setTopic({ ...topic, lessons });
  };

  const handleDeleteSublesson = (lessonIdx: number, subIdx: number) => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    lessons[lessonIdx].sublessons.splice(subIdx, 1);
    setTopic({ ...topic, lessons });
  };

  const handleChangeSubContent = (lessonIdx: number, subIdx: number, content: string) => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    lessons[lessonIdx].sublessons[subIdx].content = content;
    setTopic({ ...topic, lessons });
  };

  const handleChangeSubType = (lessonIdx: number, subIdx: number, type: 'title' | 'text' | 'cmd' | 'example') => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    lessons[lessonIdx].sublessons[subIdx].type = type;
    setTopic({ ...topic, lessons });
  };

  const handleToggleUnlockCondition = (index: number, value: 'read' | 'exercise') => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    lessons[index].unlock_condition = value;
    if (value === 'exercise' && !lessons[index].exercise) {
      lessons[index].exercise = { id: null, content: '', solution: '' };
    }
    setTopic({ ...topic, lessons });
  };

  const handleExerciseChange = (index: number, field: 'title' | 'description'|'expected_output'|'initial_code', value: string) => {
    if (!topic) return;
    const lessons = [...topic.lessons];
    if (!lessons[index].exercise) {
      lessons[index].exercise = { id: null, content: '', solution: '' };
    }
    lessons[index].exercise![field] = value;
    setTopic({ ...topic, lessons });
  };

  return (
    <div className="max-w-[1220px] h-screen mx-auto p-4">
      <Card title="Chỉnh sửa Topic" className="shadow-md">
        <div className="flex flex-col gap-3 mb-4">
          <span className="p-float-label">
            <InputText
              id="topicName"
              value={topic?.name || ''}
              onChange={(e) => handleChangeTopicName(e.target.value)}
              className="w-full"
            />
            <label htmlFor="topicName">Tên topic</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              id="sortOrder"
              keyfilter="int"
              value={topic?.sort_order.toString() || ''}
              onChange={(e) => handleChangeSortOrder(Number(e.target.value))}
              className="w-full"
            />
            <label htmlFor="sortOrder">Thứ tự (sort_order)</label>
          </span>
        </div>

        <Divider />

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Danh sách bài học</h3>
          {topic?.lessons.map((lesson, idx) => (
            <LessonEditor
              key={lesson.id}
              lesson={lesson}
              index={idx}
              onTitleChange={handleChangeLessonTitle}
              onLevelChange={handleChangeLessonLevel}
              onDescriptionChange={handleChangeLessonDescription}
              onDelete={handleDeleteLesson}
              onSubContentChange={handleChangeSubContent}
              onSubTypeChange={handleChangeSubType}
              onAddSublesson={handleAddSublesson}
              onDeleteSublesson={handleDeleteSublesson}
              onToggleUnlockCondition={handleToggleUnlockCondition}
              onExerciseChange={handleExerciseChange}
            />
          ))}
        </div>

        <Button
          label="Thêm bài học"
          icon="pi pi-plus"
          onClick={handleAddLesson}
          className="w-full !mt-4 !bg-blue-500 text-white"
        />
      </Card>

             <Button
          label="Lưu"
          icon="pi pi-plus"
          onClick={handleSave}
          className="w-full !mt-4 !bg-blue-500 text-white"
        />
    </div>
  );
}
