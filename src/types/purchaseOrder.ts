export interface PurchaseOrderItemDto {
  lastNameId: string;
  lastSizeId: string;
  quantityRequested: number;
  lastCode?: string;
  sizeLabel?: string;
}

export interface CreatePurchaseOrderRequest {
  requestedBy: string;
  department: string;
  locationId: string;
  items: PurchaseOrderItemDto[];
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  requestedBy: string;
  department: string;
  locationId: string;
  locationName?: string;
  status: 'Pending' | 'Confirmed' | 'Denied';
  items: any[];
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  denyReason?: string;
}