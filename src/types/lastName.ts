export interface LastName {
  id: string;
  lastCode: string;
  lastType: string;
  article: string;
  lastStatus: 'Active' | 'Inactive' | 'Suspended';
  customerId: string;
  customerName?: string;
  createdAt?: string;
}

export interface LastNameFilters {
  page: number;
  pageSize: number;
  customerId?: string;
  status?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}