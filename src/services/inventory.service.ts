import axiosInstance from '@/lib/axios';
import { InventoryItem, PagedResult } from '@/types/inventory';

export const InventoryService = {
  getAll: async (page: number, pageSize: number, search?: string): Promise<PagedResult<InventoryItem>> => {
    const params: any = { page, pageSize, search };
    const response = await axiosInstance.get('/InventoryStocks', { params });
    return response.data;
  },

  getById: async (id: string): Promise<InventoryItem> => {
    const response = await axiosInstance.get(`/InventoryStocks/${id}`);
    return response.data;
  },

  create: async (data: Partial<InventoryItem>): Promise<InventoryItem> => {
    const response = await axiosInstance.post('/InventoryStocks', data);
    return response.data;
  },

  update: async (id: string, data: Partial<InventoryItem>): Promise<InventoryItem> => {
    const response = await axiosInstance.put(`/InventoryStocks/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/InventoryStocks/${id}`);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new Error("Cannot delete this item because it is referenced in existing orders.");
      }
      throw error;
    }
  }
};