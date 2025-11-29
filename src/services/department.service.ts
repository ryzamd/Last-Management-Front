import axiosInstance from '@/lib/axios';

export interface Department {
  id?: string;
  departmentName: string;
  isActive: boolean;
  createdAt?: string;
}

export const DepartmentService = {
  getAll: async (): Promise<Department[]> => {
    const response = await axiosInstance.get('/Departments');
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

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/Departments/${id}`);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new Error("Cannot delete this department because it is used in existing records.");
      }
      throw error;
    }
  }
};