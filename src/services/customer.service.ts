import axiosInstance from '@/lib/axios';
import { Customer, CustomerLastName, PagedResult } from '@/types/customer';

export const CustomerService = {
  getAll: async (page: number, pageSize: number): Promise<PagedResult<Customer>> => {
    const params: any = { page, pageSize };
    const response = await axiosInstance.get('/Customers', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Customer> => {
    const response = await axiosInstance.get(`/Customers/${id}`);
    return response.data;
  },

  getLastNamesByCustomer: async (customerId: string): Promise<PagedResult<CustomerLastName>> => {
    const response = await axiosInstance.get('/LastNames', {
      params: { customerId, pageSize: 100 }
    });
    return response.data;
  },

  create: async (data: Partial<Customer>): Promise<Customer> => {
    const response = await axiosInstance.post('/Customers', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Customer>): Promise<Customer> => {
    const response = await axiosInstance.put(`/Customers/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/Customers/${id}`);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new Error("Cannot delete this customer because it is associated with existing Last Names.");
      }
      throw error;
    }
  }
};