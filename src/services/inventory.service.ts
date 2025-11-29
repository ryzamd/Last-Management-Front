import axiosInstance from '@/lib/axios';
import { AdjustStockRequest, InventoryItem, PagedResult } from '@/types/inventory';

export const InventoryService = {
  getAll: async (page: number, pageSize: number, locationId?: string): Promise<PagedResult<InventoryItem>> => {
    const params: any = { page, pageSize };
    if (locationId) params.locationId = locationId;
    
    const response = await axiosInstance.get('/InventoryStocks', { params });
    return response.data;
  },

  getById: async (id: string): Promise<InventoryItem> => {
    const response = await axiosInstance.get(`/InventoryStocks/${id}`);
    return response.data;
  },

  createOrUpdate: async (data: Partial<InventoryItem>): Promise<InventoryItem> => {
    const response = await axiosInstance.post('/InventoryStocks', data);
    return response.data;
  },

  adjustStock: async (id: string, data: AdjustStockRequest): Promise<void> => {
    await axiosInstance.post(`/InventoryStocks/${id}/adjust`, data);
  }
};