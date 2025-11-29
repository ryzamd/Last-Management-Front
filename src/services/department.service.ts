import axiosInstance from '@/lib/axios';

export interface Department {
  id: string;
  departmentName: string;
  isActive: boolean;
}

export const DepartmentService = {
  getAll: async (): Promise<Department[]> => {
    const response = await axiosInstance.get('/Departments');
    return response.data;
  }
};