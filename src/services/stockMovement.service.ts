import axiosInstance from '@/lib/axios';
import { PagedResult } from '@/types/inventory';

export interface StockMovementDto {
    id: string;
    lastNameId: string;
    lastSizeId: string;
    fromLocationId?: string;
    toLocationId?: string;
    movementType: string;
    quantity: number;
    reason?: string;
    referenceNumber?: string;
    createdBy?: string;
    createdAt: string;
    lastCode?: string;
    sizeLabel?: string;
    fromLocationName?: string;
    toLocationName?: string;
}

export const StockMovementService = {
  getAll: async (page: number, pageSize: number, movementType?: string, locationId?: string): Promise<PagedResult<StockMovementDto>> => {
    const params: any = { page, pageSize };
    if (movementType) params.movementType = movementType;
    if (locationId) params.locationId = locationId;
    
    const response = await axiosInstance.get('/StockMovements', { params });
    return response.data;
  },

  getById: async (id: string): Promise<StockMovementDto> => {
    const response = await axiosInstance.get(`/StockMovements/${id}`);
    return response.data;
  }
};