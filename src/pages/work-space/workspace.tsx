import React, { useState } from 'react';
import { runPythonCode } from '../../services/runCodeService';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { basicSetup } from 'codemirror';
import { customLightTheme } from './codemirrorTheme';
import DocsPage from './DocsPage';

import ChatFixModal from '../../components/ChatFixModal';


const extractPrompts = (code: string): string[] => {
  const regex = /input\((['"])(.*?)\1\)/g;
  const prompts: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    prompts.push(match[2]);
  }
  return prompts;
};

const Workspace: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [stdin, setStdin] = useState<string>('');
  const [output, setOutput] = useState<string>('Click ▶ RUN to see output');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(true);
  const [showFix, setShowFix] = useState(false);


  const prompts = extractPrompts(code);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    setOutput('');
    try {
      const result = await runPythonCode(code, stdin);
      setOutput(result.stdout + result.stderr);
      if (result.error) {
        setError(result.error);
      } else if (result.stderr) {
        setError(result.stderr);
      }
    } catch (e: any) {
      setError('❌ Backend connection error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <div className="h-screen flex bg-gray-50 p-6">
      {/* Editor Panel */}
      <div className="w-2/3 flex flex-col border-r bg-white">
        <header className="flex items-center justify-between px-4 py-2 border-b bg-gray-100">
          <span className="text-purple-600 font-semibold">main.py</span>
          <div className="flex items-center space-x-2">
          {/* Hiện nút sửa lỗi AI nếu lỗi không phải do chặn mã độc */}
            {error &&
              !error.includes('🚫') &&
              !error.includes('⏰') && (
                <button
                  onClick={() => setShowFix(true)}
                  className="text-blue-600 underline hover:text-blue-800 text-sm"
                >
                  🛠 Fix Code
                </button>
            )}


            <button title="Save" className="hover:bg-gray-200 p-1 rounded">💾</button>
            <button title="Settings" className="hover:bg-gray-200 p-1 rounded">⚙️</button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
          {editing ? (
            <CodeMirror
              value={code}
              height="100%"
              extensions={[basicSetup, python(), customLightTheme]}
              onChange={(value: string) => setCode(value)}
            />
          ) : (
            <pre className="p-4 h-full overflow-auto bg-gray-50 font-mono text-sm text-gray-800 whitespace-pre-wrap">
              {code || 'No code available.'}
            </pre>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-1/3 p-4 flex flex-col space-y-4">
        <div>
          <label htmlFor="stdin" className="text-xs font-semibold text-gray-600">STDIN (Optional)</label>
          {prompts.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">Detected prompts: {prompts.join(' & ')}</p>
          )}
          <textarea
            id="stdin"
            value={stdin}
            onChange={e => setStdin(e.target.value)}
            placeholder="Program input here..."
            className="w-full h-24 mt-1 p-2 font-mono text-sm border rounded focus:outline-none"
          />

        </div>

        <button
          onClick={handleRun}          
          className="
              bg-white hover:bg-blue-200 p-2 rounded font-semibold text-sm text-blue-600 
            "
            disabled={loading}
        >
          {loading ? 'Running…' : '▶ RUN'}
        </button>
        <div className="flex-1 flex flex-col">
          <label className="text-xs font-semibold text-gray-600">Output</label>

          {/* Hiện lỗi nếu có */}
          {error && (
            <div className="text-sm text-red-600 whitespace-pre-wrap font-mono mb-2">
              {error}
            </div>
          )}

          {/* Chỉ hiện output nếu không phải lỗi bị chặn mã độc */}
          <div className="flex-1 p-3 mt-1 overflow-auto bg-white border rounded font-mono text-sm text-gray-800 whitespace-pre-wrap">
            {!error?.includes('🚫') && output}
          </div>

        </div>

      </div>
      <ChatFixModal
        visible={showFix}
        code={code}
        errorMsg={error ?? ''}
        onClose={() => setShowFix(false)}
        onApply={(fixed) => {
          setCode(fixed);
          setShowFix(false);
          setEditing(true); // quay về chế độ sửa
        }}
      />
    </div>
          {/* Thêm DocsPage nằm dưới toàn bộ */}
      <div className="bg-white border-t mt-4 p-6">
        <DocsPage />
      </div>
    </>
    
  );
};

export default Workspace;