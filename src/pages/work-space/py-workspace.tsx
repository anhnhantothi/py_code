/* File: src/pages/work-space/py-workspace.tsx */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Spin } from 'antd';

interface PyWorkspaceProps {
  initialCode?: string;
  readOnly?: boolean;
  showInput?: boolean;
  timeoutMS?: number;
  stdin?: string;                    // nhận từ prop nếu muốn support external stdin
  onOutput?: (output: string) => void;
  onError?: (errMsg: string) => void;
  onCodeChange?: (newCode: string) => void;
}

const PyWorkspace: React.FC<PyWorkspaceProps> = ({
  initialCode = '',
  readOnly = false,
  showInput = true,
  timeoutMS = 5000,
  stdin = '',
  onOutput,
  onError,
  onCodeChange,
}) => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode]       = useState(initialCode);
  const [output, setOutput]   = useState('');
  const [error, setError]     = useState<string | null>(null);
  const outRef = useRef<string>('');

  // sync whenever parent thay đổi initialCode
  useEffect(() => { setCode(initialCode); }, [initialCode]);

  // load Pyodide once
  useEffect(() => {
    if (readOnly) {
      setLoading(false);
      return;
    }
    (async () => {
      const py = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
      });
      setPyodide(py);
      setLoading(false);
    })();
  }, [readOnly]);

  const runCode = async () => {
    if (!pyodide) return;

    // bắt buộc stdin nếu code dùng input()
    if (code.includes('input(') && stdin.trim() === '') {
      const msg = '⚠️ Vui lòng nhập dữ liệu cho stdin trước khi chạy.';
      setError(msg);
      onError?.(msg);
      return;
    }

    // reset
    setError(null);
    outRef.current = '';
    setOutput('');

    // capture stdout/stderr
    pyodide.setStdout({ batched: (s: string) => outRef.current += s });
    pyodide.setStderr({ batched: (s: string) => outRef.current += s });

    // prepare stdin via StringIO
    const esc = stdin.replace(/"/g, '\\"');
    const preamble = `import sys, io\nsys.stdin = io.StringIO("${esc}\\n")\n`;

    const fullCode = preamble + code;
    try {
      // run with timeout
      const exec = pyodide.runPythonAsync(fullCode);
      const timer = new Promise<never>((_, rej) =>
        setTimeout(() => rej(new Error('Execution timed out')), timeoutMS)
      );
      await Promise.race([exec, timer]);

      // success
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
        onChange={e =>{
          setCode(e.target.value);
          onCodeChange?.(e.target.value);
        }}
      />

      {showInput && (
        <textarea
          className="w-full p-2 font-mono border rounded resize-none"
          rows={3}
          value={stdin}
          onChange={e => onError == null /* no-op for external stdin */ && null}
          placeholder="stdin input here..."
          disabled={!!stdin}  /* nếu dùng external stdin, bạn truyền prop và disable textarea */
        />
      )}

      <div className="flex items-center space-x-2">
        <Button type="primary" onClick={runCode}>Run</Button>
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
