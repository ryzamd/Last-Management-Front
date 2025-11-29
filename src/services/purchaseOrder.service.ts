import axiosInstance from '@/lib/axios';
import { CreatePurchaseOrderRequest, PurchaseOrder } from '@/types/purchaseOrder';

export const PurchaseOrderService = {
  create: async (data: CreatePurchaseOrderRequest): Promise<PurchaseOrder> => {
    const response = await axiosInstance.post('/PurchaseOrders', data);
    return response.data;
  },

  getAll: async (page: number, pageSize: number, status?: string) => {
    const params: any = { page, pageSize };
    if (status) params.status = status;
    const response = await axiosInstance.get('/PurchaseOrders', { params });
    return response.data;
  },

  getById: async (id: string): Promise<PurchaseOrder> => {
    const response = await axiosInstance.get(`/PurchaseOrders/${id}`);
    return response.data;
  },

  confirm: async (id: string): Promise<void> => {
    await axiosInstance.post(`/PurchaseOrders/${id}/confirm`);
  },

  deny: async (id: string, reason: string): Promise<void> => {
    await axiosInstance.post(`/PurchaseOrders/${id}/deny`, { reason });
  }
};