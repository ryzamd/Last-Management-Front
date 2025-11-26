import axios from 'axios';
import { LoginRequest } from '@/types/auth';

const API_URL = process.env.API_URL || 'http://localhost:5030/api';

export const AuthService = {
  login: async (credentials: LoginRequest) => {
    // Gọi API thực tế
    const response = await axios.post(`${API_URL}/Auth/login`, credentials);
    return response.data;
  },
  
  mockLogin: async (credentials: LoginRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake delay
    if (credentials.username === 'admin' && credentials.password === '123456') {
      return {
        username: 'Admin',
        role: 'Admin',
        token: 'fake-jwt-token-admin',
      };
    }
    throw new Error('Invalid credentials');
  }
};