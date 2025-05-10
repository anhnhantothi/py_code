// File: src/pages/WorkspaceScreen.tsx
import  { useState } from 'react';
import { Button, Alert } from 'antd';
import PyWorkspace from '../work-space/py-workspace';
import ChatFixModal from '../../components/ChatFixModal';

export default function WorkspaceScreen() {
  const [code, setCode]       = useState<string>('');
  const [output, setOutput]   = useState<string>('');
  const [error, setError]     = useState<string | null>(null);
  const [showFix, setShowFix] = useState(false);

  const shortError = error?.split('\n')[0] ?? '';

  return (
    <div className="w-screen h-screen flex px-6 bg-gray-50">
      <div className="flex-1 flex flex-col p-4 space-y-4">
        <h2 className="text-xl font-semibold">Python Workspace</h2>

        <PyWorkspace
          initialCode={code}
          onCodeChange={setCode}
          onOutput={(res) => {
            setOutput(res);
            setError(null);
          }}
          onError={(msg) => setError(msg)}
          timeoutMS={10000}
        />

        {/* Error & fix */}
        {error && (
          <div className="space-y-2">
            <Alert type="error" showIcon message="Lỗi" description={shortError} />
            <Button danger onClick={() => setShowFix(true)}>Sửa lỗi</Button>
          </div>
        )}

        {/* ChatFixModal */}
        {showFix && (
          <ChatFixModal
            visible={showFix}
            code={code}
            errorMsg={error ?? ''}
            onClose={() => setShowFix(false)}
            onApply={(fixed: string) => {
              setCode(fixed);
              setError(null);
              setShowFix(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
