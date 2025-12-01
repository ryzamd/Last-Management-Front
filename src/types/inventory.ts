export interface InventoryItem {
  id?: string;
  lastNameId: string;
  lastModelId: string;
  lastSizeId: string;
  departmentId: string;
  quantityGood: number;
  quantityDamaged: number;
  quantityReserved: number;
  lastCode?: string;
  modelName?: string;
  sizeLabel?: string;
  departmentName?: string;
  createdAt?: string;
}

export interface AdjustStockRequest {
  quantityChange: number;
  movementType: 'Purchase' | 'Transfer' | 'Adjustment' | 'Damage' | 'Reserve';
  reason?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}