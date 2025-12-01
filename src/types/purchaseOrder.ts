export interface PurchaseOrderItemDto {
  lastNameId: string;
  lastModelId: string;
  lastSizeId: string;
  quantityRequested: number;
  lastCode?: string;
  modelName?: string;
  sizeLabel?: string;
}

export interface CreatePurchaseOrderRequest {
  requestedBy: string;
  department: string;
  departmentId: string;
  items: PurchaseOrderItemDto[];
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  requestedBy: string;
  department: string;
  departmentId: string;
  departmentName?: string;
  status: 'Pending' | 'Confirmed' | 'Denied';
  items: PurchaseOrderItemDto[];
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  denyReason?: string;
}