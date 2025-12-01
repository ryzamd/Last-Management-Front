import axiosInstance from '@/lib/axios';
import { InventoryMatrixDto } from '@/types/report';

export const ReportService = {
  getInventoryMatrix: async (): Promise<InventoryMatrixDto> => {
    const response = await axiosInstance.get('/Reports/inventory-matrix');
    return response.data;
  }
};