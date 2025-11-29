export interface InventoryItem {
  id?: string;
  lastNameId: string;
  lastSizeId: string;
  locationId: string;
  quantityGood: number;
  quantityDamaged: number;
  quantityReserved: number;
  lastCode?: string;
  sizeLabel?: string;
  locationName?: string;
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