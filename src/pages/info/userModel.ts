// File: src/models/userModel.ts

export interface User {
  id?: number;
  fullName?: string;
  job?: string;
  phone?: string;
  address?: string;
  email?: string;
  gender?: 'MALE' | 'FEMALE';
  enabled?: boolean;
  vip?: boolean;
  useNumber?: number;
}

export const createUser = (): User => ({
  fullName: '',
  job: '',
  phone: '',
  address: '',
  email: '',
  gender: 'MALE',
  enabled: true,
  vip: false,
  useNumber: 3,
});
