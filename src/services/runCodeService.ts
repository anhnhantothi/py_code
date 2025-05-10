// File: src/services/runner.ts

export async function runPythonCode(code: string, stdin: string) {
  const res = await fetch('http://localhost:5000/api/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, stdin }),
  });

  if (!res.ok) {
    throw new Error('❌ Lỗi kết nối đến máy chủ');
  }

  return res.json();
}
