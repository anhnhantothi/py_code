// File: src/services/loginService.ts
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export async function login(
  credentials: LoginCredentials,
  loginContextFn: (username: string) => void  //truyền thêm hàm login từ context
): Promise<LoginResponse> {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (response.ok) {
    // localStorage.setItem('token', data.token);
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('username', credentials.username);
    loginContextFn(credentials.username); 
    return { success: true };
  } else {
    return { success: false, error: data.error || 'Login failed' };
  }
}