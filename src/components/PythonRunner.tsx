/* File: src/components/PythonRunner.tsx */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import ChatFixModal from './ChatFixModal';

interface PythonRunnerProps {
  initialCode?: string;
  readOnly?: boolean;
  overlayButton?: boolean;
  showLintButton?: boolean;
  expandOutput?: boolean;
  onChange?: (newCode: string) => void;
  onOutput?: (output: string) => void;
}

const PythonRunner: React.FC<PythonRunnerProps> = ({
  initialCode = '',
  readOnly = false,
  overlayButton = false,
  showLintButton = false,
  expandOutput = false,
  onChange,
  onOutput,
}) => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [hasError, setHasError] = useState(false);
  // Chỉ hiển thị output sau khi nhấn run
  const [showOutput, setShowOutput] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const outputRef = useRef('');

  // Đồng bộ code khi initialCode thay đổi
  useEffect(() => {
    setCode(initialCode);
    if (typeof onChange === 'function') {
      onChange(initialCode);
    }
    // ẩn output khi initialCode thay đổi
    setShowOutput(false);
  }, [initialCode, onChange]);

  useEffect(() => {
    if (readOnly) {
      setLoading(false);
      return;
    }
    async function initPy() {
      const py = await (window as any).loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/' });
      setPyodide(py);
      setLoading(false);
    }
    initPy();
  }, [readOnly]);

  const runCode = async () => {
    if (!pyodide) return;
    outputRef.current = '';
    setShowOutput(true);
    setHasError(false);
    pyodide.setStdout({ batched: (s: string) => { outputRef.current += s; } });
    try {
      await pyodide.runPythonAsync(code);
      setOutput(outputRef.current);
      if (typeof onOutput === 'function') {
        onOutput(outputRef.current);
      }
    } catch (err: any) {
      setOutput(err.toString());
      setHasError(true);
      if (typeof onOutput === 'function') {
        onOutput(err.toString());
      }
    }
  };

  const containerClasses = [
    'w-full rounded overflow-hidden',
    expandOutput ? 'flex flex-col h-full' : 'min-h-[200px] p-4',
  ].filter(Boolean).join(' ');

  return (
    <div className={`${containerClasses} bg-transparent`}>
      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-500">Đang khởi tạo môi trường Python...</p>
        </div>
      ) : readOnly ? (
        <pre className="flex-1 p-4 font-mono bg-gray-100 overflow-auto">{initialCode}</pre>
      ) : (
        <>
          <textarea
            className={`w-full p-2 font-mono resize-none border ${overlayButton ? '' : 'border-gray-100 rounded'}`}
            style={overlayButton ? { paddingBottom: '4rem' } : undefined}
            value={code}
            onChange={e => {
              const v = e.target.value;
              setCode(v);
              if (typeof onChange === 'function') {
                onChange(v);
              }
            }}
            rows={overlayButton ? 8 : 10}
          />

          <div className={`mt-2 flex space-x-2 bg-transparent ${overlayButton ? 'bottom-2 left-2 right-2 justify-end' : ''}`}>
            <Button type="primary" onClick={runCode}>Chạy code</Button>
            {showLintButton && <Button disabled={!hasError} onClick={() => setChatVisible(true)}>Sửa lỗi</Button>}
          </div>

          {chatVisible && <ChatFixModal visible={chatVisible} code={code} onClose={() => setChatVisible(false)} />}

          {/* Output chỉ hiển thị sau khi nhấn run */}
          {showOutput && (
            expandOutput ? (
              <pre className="flex-1 mt-4 overflow-auto bg-gray-800 text-white p-4 rounded">{output}</pre>
            ) : (
              <pre className="mt-4 h-32 overflow-auto bg-gray-800 text-white p-4 rounded">{output}</pre>
            )
          )}
        </>
      )}
    </div>
  );
};

export default PythonRunner;