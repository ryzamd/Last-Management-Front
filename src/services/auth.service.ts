import axiosInstance from '@/lib/axios';
import { LoginRequest, User } from '@/types/auth';

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<User> => {
    try {
      const response = await axiosInstance.post('/Auth/login', credentials);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Login failed');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  logout: () => {
    // Logic logout đã được xử lý ở store, service này có thể gọi API revoke token nếu cần
  }
};