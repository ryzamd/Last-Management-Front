import axios from 'axios';
import { LoginRequest, User } from '@/types/auth';

// Sử dụng relative path '/api' để tận dụng Next.js Rewrite Proxy (đã config trong next.config.ts)
// Request sẽ đi từ: Browser -> Next.js Server (/api/...) -> .NET Backend (http://localhost:5030/api/...)
const API_URL = '/api';

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<User> => {
    try {
      const response = await axios.post(`${API_URL}/Auth/login`, credentials);
      
      // Backend trả về TokenResponse: { token, expiresAt, username, role }
      // Frontend User type: { username, role, token } -> Mapping tự động khớp vì trùng tên field (JSON response thường là camelCase)
      return response.data; 
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Lấy message lỗi từ backend trả về (nếu có)
        // Backend trả về: { status: 401, message: "Invalid credentials", ... } (Do ExceptionMiddleware xử lý)
        throw new Error(error.response.data?.message || 'Login failed');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Giữ lại hàm logout nếu cần gọi API để hủy token (hiện tại dùng JWT stateless nên chỉ cần xóa ở client)
  logout: () => {
    // Xử lý clear data nếu cần
  }
};