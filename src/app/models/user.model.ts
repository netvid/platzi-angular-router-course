export interface User{
  id: number;
  name: string;
  email: string;
  password: string;
  // Declared in the api
  role: 'customer' | 'admin';
}

export interface CreateUserDTO extends Omit<User, 'id'>{}
