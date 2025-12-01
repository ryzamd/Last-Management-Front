export interface LastSize {
  id?: string;
  sizeValue: number;
  sizeLabel: string;
  status: 'Active' | 'Inactive';
  replacementSizeId?: string;
  replacementSizeLabel?: string;
  lastNameId: string;
  createdAt?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}