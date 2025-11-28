import axiosInstance from '@/lib/axios';
import { LastName, PagedResult } from '@/types/lastName';

export const LastNameService = {
  getAll: async (page: number, pageSize: number, customerId?: string, status?: string): Promise<PagedResult<LastName>> => {
    const params: any = { page, pageSize };
    if (customerId) params.customerId = customerId;
    if (status) params.status = status;
    
    const response = await axiosInstance.get('/LastNames', { params });
    return response.data;
  },

  getById: async (id: string): Promise<LastName> => {
    const response = await axiosInstance.get(`/LastNames/${id}`);
    return response.data;
  },

  create: async (data: Partial<LastName>): Promise<LastName> => {
    const response = await axiosInstance.post('/LastNames', data);
    return response.data;
  },

  update: async (id: string, data: Partial<LastName>): Promise<LastName> => {
    const response = await axiosInstance.put(`/LastNames/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/LastNames/${id}`);
    } catch (error: any) {
      // Xử lý lỗi ràng buộc dữ liệu từ BE (Inventory/Order đã sử dụng Last này)
      if (error.response && error.response.status === 409) {
        throw new Error(error.response.data?.message || "Cannot delete Last Name because it is used in Inventory or Orders.");
      }
      throw error;
    }
  }
};