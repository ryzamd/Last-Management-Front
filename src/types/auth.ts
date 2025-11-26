export interface User {
  username: string;
  role: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}