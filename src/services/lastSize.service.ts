import axiosInstance from '@/lib/axios';
import { LastSize } from '@/types/lastSize';

export const LastSizeService = {
  getAll: async (lastNameId?: string): Promise<LastSize[]> => {
    const params: any = {};
    if (lastNameId) params.lastNameId = lastNameId;

    const response = await axiosInstance.get('/LastSizes', { params });
    return response.data;
  },

  getById: async (id: string): Promise<LastSize> => {
    const response = await axiosInstance.get(`/LastSizes/${id}`);
    return response.data;
  },

  create: async (data: Partial<LastSize>): Promise<LastSize> => {
    const response = await axiosInstance.post('/LastSizes', data);
    return response.data;
  },

  update: async (id: string, data: Partial<LastSize>): Promise<LastSize> => {
    const response = await axiosInstance.put(`/LastSizes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/LastSizes/${id}`);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new Error("Cannot delete this size because it is used in Inventory or Orders.");
      }
      throw error;
    }
  }
};