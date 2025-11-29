import axiosInstance from '@/lib/axios';

export interface LastSize {
  id: string;
  sizeLabel: string;
  sizeValue: number;
  status: string;
}

export const LastSizeService = {
  getAll: async (): Promise<LastSize[]> => {
    const response = await axiosInstance.get('/LastSizes');
    return response.data;
  }
};