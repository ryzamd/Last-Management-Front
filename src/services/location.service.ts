import axiosInstance from '@/lib/axios';
import { Location, PagedResult } from '@/types/location';

export const LocationService = {
  getAll: async (page: number, pageSize: number, locationType?: string, isActive?: boolean): Promise<PagedResult<Location>> => {
    const params: any = { page, pageSize };
    if (locationType) params.locationType = locationType;
    if (isActive !== undefined) params.isActive = isActive;
    
    const response = await axiosInstance.get('/Locations', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Location> => {
    const response = await axiosInstance.get(`/Locations/${id}`);
    return response.data;
  },

  create: async (data: Partial<Location>): Promise<Location> => {
    const response = await axiosInstance.post('/Locations', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Location>): Promise<Location> => {
    const response = await axiosInstance.put(`/Locations/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/Locations/${id}`);
    } catch (error: any) {
      // Handle constrained delete error from BE
      if (error.response && error.response.status === 409) {
        throw new Error(error.response.data?.message || "Cannot delete location due to existing dependencies.");
      }
      throw error;
    }
  }
};