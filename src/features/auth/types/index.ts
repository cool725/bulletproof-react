export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: 'ADMIN' | 'USER';
}

export interface UserResponse {
  jwt: string;
  user: AuthUser;
}
