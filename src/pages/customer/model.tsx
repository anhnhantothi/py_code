import { faker } from '@faker-js/faker';


export interface User {
    id: number |null;
    code: string;
    username: string;
    email: string;
    job:string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
    phone: string | null;
    address: string;
    startDate: Date | null;
    lastOnl: Date | null;
    isAdmin:boolean;
    useNumber:number|null;
    vip:boolean;
    enabled :boolean;
  }



  export interface ApiResponse<T> {
    data: {
      content: T[];
      page: number;
      size: number;
      total: number;
    };
    code: number;
    success: boolean;
  }




  export const createUser = (overrides: Partial<User> = {}): User => ({
    id: null,
    code: "",
    username: "",
    email: "",
    job: "",
    fullName: "",
    gender: "MALE",
    phone: null,
    address: "",
    startDate: null,
    lastOnl: null,
    isAdmin: false,
    useNumber: null,
    vip: false,
    enabled: true,
    ...overrides,
});