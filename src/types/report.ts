export interface DepartmentMatrixRow {
  departmentName: string;
  departmentType: string;
  quantities: Record<string, number>;
  total: number;
}

export interface InventoryMatrixRow {
  customerName: string;
  lastName: string;
  lastModel: string;
  imageUrl?: string;
  departmentRows: DepartmentMatrixRow[];
  totalQuantity: number;
}

export interface InventoryMatrixDto {
  allSizes: string[];
  rows: InventoryMatrixRow[];
}