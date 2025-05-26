import React, { useState } from 'react';
import { runPythonCode } from '../../services/runCodeService';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { basicSetup } from 'codemirror';
import { customLightTheme } from './codemirrorTheme';
import DocsPage from './DocsPage';
import ChatFixModal from '../../components/ChatFixModal';
import { motion } from 'framer-motion';
import { useCheckChatLimit } from '../../hooks/useCheckChatLimit';
import { useToast } from '../../contexts/ToastContext';

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

  const { checkLimit } = useCheckChatLimit();
  const toast = useToast();

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
      console.log('🧪 Error:', result.error);
    } catch (e: any) {
      setError('❌ Backend connection error');
    } finally {
      setLoading(false);
    }

  };

  const handleFixClick = async () => {
    const allowed = await checkLimit();
    if (!allowed) return;
    setShowFix(true);
  };

  return (
    <>
      <motion.div
        className="h-screen flex bg-gradient-to-br from-indigo-50 to-white p-6 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Editor Panel */}
        <motion.div
          className="w-2/3 flex flex-col border-r border-gray-200 bg-white rounded-l-xl shadow-lg overflow-hidden"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <header className="flex items-center justify-between px-4 py-2 border-b bg-gray-100">
            <span className="text-purple-600 font-semibold">main.py</span>
            <div className="flex items-center space-x-2">
              {error &&
                !error.includes('🚫') &&
                !error.includes('⏰') && (
                  <button
                    onClick={handleFixClick}
                    className="text-blue-600 underline hover:text-blue-800 text-sm"
                  >
                    🛠 Sửa Code
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
        </motion.div>

        {/* Control Panel */}
        <motion.div
          className="w-1/3 p-4 flex flex-col space-y-4 bg-white rounded-r-xl shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <label htmlFor="stdin" className="text-xs font-semibold text-gray-600">STDIN (Optional)</label>
            {prompts.length > 0 && (
              <p className="mt-1 text-sm font-semibold text-purple-700 ">Detected prompts: {prompts.join('\n & ')}</p>
            )}
            <textarea
              id="stdin"
              value={stdin}
              onChange={e => setStdin(e.target.value)}
              placeholder="Nhập input nếu có..."
              className="w-full h-24 mt-1 p-2 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <button
            onClick={handleRun}
            className="w-full inline-block self-start bg-gradient-to-r from-purple-100 to-white-500 text-purple-600 font-semibold text-sm px-4 py-2 rounded-lg shadow-md transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
            disabled={loading}
          >
            {loading ? 'Running…' : '▶ RUN'}
          </button>

          <div className="flex-1 flex flex-col">
            <label className="text-xs font-semibold text-gray-600">Output</label>
            <div className="flex-1 p-3 mt-1 overflow-auto bg-white border rounded font-mono text-sm whitespace-pre-wrap text-gray-800">
              {error?.includes('🚫') ? (
                <div className="text-red-600 font-semibold">{error}</div>
              ) : output}
            </div>

          </div>
        </motion.div>

        <ChatFixModal
          visible={showFix}
          code={code}
          errorMsg={error ?? ''}
          onClose={() => setShowFix(false)}
          onApply={(fixed) => {
            setCode(fixed);
            setShowFix(false);
            setEditing(true);
          }}
        />
      </motion.div>

      {/* DocsPage below */}
      <motion.div
        className="bg-white border-t mt-4 p-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <DocsPage />
      </motion.div>
    </>
  );
};

export default Workspace;
