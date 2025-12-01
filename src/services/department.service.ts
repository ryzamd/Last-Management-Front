import axiosInstance from '@/lib/axios';
import { Department, PagedResult } from '@/types/department';

export const DepartmentService = {
  getAll: async (page: number, pageSize: number, departmentType?: string, isActive?: boolean): Promise<PagedResult<Department>> => {
    const params: any = { page, pageSize };
    if (departmentType) params.departmentType = departmentType;
    if (isActive !== undefined) params.isActive = isActive;
    
    const response = await axiosInstance.get('/Departments', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Department> => {
    const response = await axiosInstance.get(`/Departments/${id}`);
    return response.data;
  },

  create: async (data: Partial<Department>): Promise<Department> => {
    const response = await axiosInstance.post('/Departments', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Department>): Promise<Department> => {
    const response = await axiosInstance.put(`/Departments/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/Departments/${id}`);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new Error(error.response.data?.message || "Cannot delete department due to existing dependencies.");
      }
      throw error;
    }
  }
};