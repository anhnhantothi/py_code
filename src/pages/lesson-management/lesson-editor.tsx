import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { Trash, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Lesson } from './lesson-detail';
import { InputTextarea } from 'primereact/inputtextarea';

interface Props {
  lesson: Lesson;
  index: number;
  onTitleChange: (index: number, title: string) => void;
  onLevelChange: (index: number, level: string) => void;
  onDescriptionChange: (index: number, description: string) => void;
  onDelete: (index: number) => void;
  onSubContentChange: (lessonIdx: number, subIdx: number, content: string) => void;
  onSubTypeChange: (lessonIdx: number, subIdx: number, type: 'title' | 'text' | 'cmd' | 'example') => void;
  onAddSublesson: (lessonIdx: number) => void;
  onDeleteSublesson: (lessonIdx: number, subIdx: number) => void;
  onToggleUnlockCondition: (index: number, value: 'read' | 'exercise') => void;
  onExerciseChange: (index: number, field: 'title' | 'description'|'expected_output'|'initial_code', value: string) => void;
}

const LessonEditor: React.FC<Props> = ({
  lesson,
  index,
  onTitleChange,
  onLevelChange,
  onDescriptionChange,
  onDelete,
  onSubContentChange,
  onSubTypeChange,
  onAddSublesson,
  onDeleteSublesson,
  onToggleUnlockCondition,
  onExerciseChange
}) => {
  const [showSublessons, setShowSublessons] = useState<boolean>(false);

  const toggleSublessons = () => {
    setShowSublessons((prev) => !prev);
  };

  const typeOptions = [
    { label: 'Tiêu đề', value: 'title' },
    { label: 'Đoạn văn', value: 'text' },
    { label: 'Lệnh', value: 'cmd' },
    { label: 'Ví dụ', value: 'example' }
  ];

  return (
    <div className="border rounded-md bg-white p-4 space-y-4">
      {/* Tiêu đề + hành động */}
      <div className="flex justify-between items-center gap-2">
        <InputText
          value={lesson.title}
          onChange={(e) => onTitleChange(index, e.target.value)}
          className="w-full"
          placeholder="Nhập tiêu đề bài học"
        />
        <div className="flex items-center gap-1">
          <Button
            icon={showSublessons ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            className="p-2 p-button-text"
            onClick={toggleSublessons}
            aria-label="Toggle Sublessons"
          />
          <Button
            icon={<Trash className="w-4 h-4 text-red-500" />}
            className="p-2 rounded-lg hover:bg-red-50 transition"
            onClick={() => onDelete(index)}
            aria-label="Xoá bài học"
          />
        </div>
      </div>

      {/* Level */}
      <InputText
        value={lesson.level}
        onChange={(e) => onLevelChange(index, e.target.value)}
        className="w-full !mb-2"
        placeholder="Nhập độ khó (level)"
      />

      {/* Description */}
      <Editor
        value={lesson.description}
        onTextChange={(e) => onDescriptionChange(index, e.htmlValue ?? '')}
        style={{ height: '100px' }}
        placeholder="Mô tả bài học"
      />

      {/* Checkbox unlock_condition */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={lesson.unlock_condition === 'exercise'}
          onChange={(e) =>
            onToggleUnlockCondition(index, e.target.checked ? 'exercise' : 'read')
          }
        />
        <label className="text-sm text-gray-700">
          Yêu cầu làm bài tập để mở khóa bài học
        </label>
      </div>

      {/* Exercise nếu cần */}
   {lesson.unlock_condition === 'exercise' && (
  <div className="space-y-2 mt-2">
    <h4 className="text-sm font-semibold text-blue-600">Bài tập (Exercise)</h4>

    <InputText
      value={lesson.exercise?.title || ''}
      onChange={(e) => onExerciseChange(index, 'title', e.target.value)}
      className="w-full !mb-2"
      placeholder="Tiêu đề bài tập"
    />

    <InputTextarea
      value={lesson.exercise?.description || ''}
      onChange={(e) => onExerciseChange(index, 'description', e.target.value)}
      className="w-full mb-2"
      placeholder="Nội dung bài tập"
      rows={5}
      autoResize
    />
      <InputText
      value={lesson.exercise?.expected_output || ''}
      onChange={(e) => onExerciseChange(index, 'expected_output', e.target.value)}
      className="w-full !mb-2"
      placeholder="Kết quả"
    />
      <InputTextarea
      value={lesson.exercise?.initial_code || ''}
      onChange={(e) => onExerciseChange(index, 'initial_code', e.target.value)}
      className="w-full mb-2"
      placeholder="Code mẫu có sẵn"
      rows={5}
      autoResize
    />
  </div>
)}


      {/* Sublessons */}
      {showSublessons && (
        <div className="pl-4 border-l-2 border-blue-200 mt-2">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Sublessons</h4>

          {lesson.sublessons.map((sub, subIdx) => (
            <div key={sub.id ?? `${index}-${subIdx}`} className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Dropdown
                    value={sub.type}
                    options={typeOptions}
                    onChange={(e) => onSubTypeChange(index, subIdx, e.value)}
                    placeholder="Loại"
                    className="w-36 text-sm"
                  />
                  <span className="text-gray-500 text-sm">#{sub.sort_order}</span>
                </div>
                <Button
                  icon={<Trash className="w-4 h-4 text-red-500" />}
                  className="p-button-text"
                  onClick={() => onDeleteSublesson(index, subIdx)}
                />
              </div>

              {['title', 'text'].includes(sub.type) ? (
                <Editor
                  value={sub.content}
                  onTextChange={(e) => onSubContentChange(index, subIdx, e.htmlValue ?? '')}
                  style={{ height: '120px' }}
                />
              ) : (
                <InputText
                  value={sub.content}
                  onChange={(e) => onSubContentChange(index, subIdx, e.target.value)}
                  className="w-full"
                />
              )}
            </div>
          ))}

          <Button
            icon={<Plus className="w-4 h-4" />}
            label="Thêm sublesson"
            className="p-button-text text-blue-600 mt-2"
            onClick={() => onAddSublesson(index)}
          />
        </div>
      )}
    </div>
  );
};

export default LessonEditor;
