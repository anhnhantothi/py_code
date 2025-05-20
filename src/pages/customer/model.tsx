import { faker } from '@faker-js/faker';


export interface User {
    id: string;
    code: string;
    username: string;
    email: string;
    job:string;
    fullName: string;
    gender: 'MALE' | 'FEMALE';
    phoneNumber: string | null;
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


  export const generateFakeUser = (): User => ({
    id: faker.string.uuid(),
    code: faker.string.alpha({ length: 6 }).toUpperCase(),
    gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    job: faker.name.jobTitle(),
    useNumber:faker.number.int(),
    fullName: faker.person.fullName(),
    phoneNumber: faker.phone.number({ 
        style: 'international', 
      }),    address: faker.location.streetAddress(),
    startDate: faker.date.past({ years: 5 }),
        lastOnl: faker.date.recent(),
    enabled: faker.datatype.boolean(),
    isAdmin: faker.datatype.boolean(),
    vip: faker.datatype.boolean(),
  });


  export const generateFakeUsers = (count: number = 10): User[] => 
    Array.from({ length: count }, generateFakeUser);



  export const createUser = (overrides: Partial<User> = {}): User => ({
    id: "",
    code: "",
    username: "",
    email: "",
    job: "",
    fullName: "",
    gender: "MALE",
    phoneNumber: null,
    address: "",
    startDate: null,
    lastOnl: null,
    isAdmin: false,
    useNumber: null,
    vip: false,
    enabled: true,
    ...overrides,
});