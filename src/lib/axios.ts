import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// Tạo instance riêng để dễ quản lý config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // Dùng biến môi trường hoặc proxy path
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Tự động đính kèm Token vào mọi request
axiosInstance.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    const token = state.user?.token;

    // DEBUG: Kiểm tra xem token có tồn tại trước khi gửi không
    console.log(`[Axios] Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("[Axios] Token attached");
    } else {
      console.warn("[Axios] Token MISSING");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Xử lý lỗi chung (VD: 401 logout)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // DEBUG: Log lỗi chi tiết từ BE
    if (error.response) {
        console.error("[Axios] Error Response:", error.response.status, error.response.data);
    }

    if (error.response?.status === 401) {
      console.warn("[Axios] Received 401 Unauthorized.");
      
      // TẠM THỜI: Comment dòng này để tránh logout oan khi đang debug
      // useAuthStore.getState().logout();
      
      // Thay vào đó, chỉ thông báo lỗi
      // Có thể thêm logic refresh token ở đây sau này
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;