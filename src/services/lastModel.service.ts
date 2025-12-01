import axiosInstance from '@/lib/axios';
import { LastModel, LastNameModel, PagedResult } from '@/types/lastModel';

export const LastModelService = {
  getAll: async (page: number, pageSize: number, status?: string): Promise<PagedResult<LastModel>> => {
    const params: any = { page, pageSize };
    if (status) params.status = status;
    
    const response = await axiosInstance.get('/LastModels', { params });
    return response.data;
  },

  getById: async (id: string): Promise<LastModel> => {
    const response = await axiosInstance.get(`/LastModels/${id}`);
    return response.data;
  },

  create: async (data: Partial<LastModel>): Promise<LastModel> => {
    const response = await axiosInstance.post('/LastModels', data);
    return response.data;
  },

  update: async (id: string, data: Partial<LastModel>): Promise<LastModel> => {
    const response = await axiosInstance.put(`/LastModels/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/LastModels/${id}`);
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
            throw new Error(error.response.data?.message || "Cannot delete model due to existing dependencies.");
        }
        throw error;
    }
  },

  // Association Management
  getLastNamesByModel: async (modelId: string): Promise<LastNameModel[]> => {
    const response = await axiosInstance.get(`/LastModels/${modelId}/lastnames`);
    return response.data;
  },

  assignLastNameToModel: async (modelId: string, lastNameId: string): Promise<void> => {
    await axiosInstance.post(`/LastModels/${modelId}/lastnames/${lastNameId}`);
  },

  removeLastNameFromModel: async (modelId: string, lastNameId: string): Promise<void> => {
    await axiosInstance.delete(`/LastModels/${modelId}/lastnames/${lastNameId}`);
  }
};