/* File: src/pages/work-space/py-workspace.tsx */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Spin } from 'antd';

interface PyWorkspaceProps {
  initialCode?: string;
  readOnly?: boolean;
  showInput?: boolean;
  timeoutMS?: number;
  onOutput?: (output: string) => void;
  onError?: (errMsg: string) => void;
  onCodeChange?: (newCode: string) => void;
}

const PyWorkspace: React.FC<PyWorkspaceProps> = ({
  initialCode = '',
  readOnly = false,
  showInput = true,
  timeoutMS = 5000,
  onOutput,
  onError,
  onCodeChange,
}) => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(initialCode);
  const [input, setInput] = useState(''); // ✅ Khai báo biến input
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const outRef = useRef<string>('');

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (readOnly) {
      setLoading(false);
      return;
    }
    (async () => {
      const py = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
      });
      setPyodide(py);
      setLoading(false);
    })();
  }, [readOnly]);

  const runCode = async () => {
    if (!pyodide) return;

    if (code.includes('input(') && input.trim() === '') {
      const msg = '⚠️ Vui lòng nhập dữ liệu cho stdin trước khi chạy.';
      setError(msg);
      onError?.(msg);
      return;
    }

    setError(null);
    outRef.current = '';
    setOutput('');

    pyodide.setStdout({ batched: (s: string) => (outRef.current += s) });
    pyodide.setStderr({ batched: (s: string) => (outRef.current += s) });

    const esc = input.replace(/"/g, '\\"').replace(/\n/g, '\\n'); // tránh lỗi xuống dòng
    const preamble = `import sys, io\nsys.stdin = io.StringIO("${esc}")\n`;

    const fullCode = preamble + code;

    try {
      const exec = pyodide.runPythonAsync(fullCode);
      const timer = new Promise<never>((_, rej) =>
        setTimeout(() => rej(new Error('Execution timed out')), timeoutMS)
      );
      await Promise.race([exec, timer]);

      setOutput(outRef.current);
      onOutput?.(outRef.current);
    } catch (e: any) {
      const msg = e.message || String(e);
      setError(msg);
      onError?.(msg);
      setOutput(outRef.current + '\n' + msg);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-2">
      <textarea
        className="w-full flex-1 p-2 font-mono border rounded resize-none"
        style={{ minHeight: 200 }}
        value={code}
        readOnly={readOnly}
        onChange={(e) => {
          setCode(e.target.value);
          onCodeChange?.(e.target.value);
        }}
      />

      {showInput && (
        <textarea
          className="w-full p-2 font-mono border rounded resize-none"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="stdin input here..."
        />
      )}

      <div className="flex items-center space-x-2">
        <Button type="primary" onClick={runCode}>
          Run
        </Button>
        {error && (
          <span className="text-red-500 font-mono break-words">
            {error.split('\n')[0]}
          </span>
        )}
      </div>

      <pre className="flex-1 overflow-auto p-4 bg-black text-white rounded whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
};

export default PyWorkspace;
