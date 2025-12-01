import axiosInstance from '@/lib/axios';
import { StockMovementDto } from '@/types/stockMovement';
import { PagedResult } from '@/types/inventory';

export const StockMovementService = {
  getAll: async (page: number, pageSize: number, movementType?: string, departmentId?: string): Promise<PagedResult<StockMovementDto>> => {
    const params: any = { page, pageSize };
    if (movementType) params.movementType = movementType;
    if (departmentId) params.departmentId = departmentId;
    
    const response = await axiosInstance.get('/StockMovements', { params });
    return response.data;
  },

  getById: async (id: string): Promise<StockMovementDto> => {
    const response = await axiosInstance.get(`/StockMovements/${id}`);
    return response.data;
  }
};