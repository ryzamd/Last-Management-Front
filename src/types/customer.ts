export interface Customer {
  id: string;
  customerName: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  createdAt?: string;
  updatedAt?: string;
}

// DTO cho LastName (để hiển thị trong Details Modal)
export interface CustomerLastName {
  id: string;
  lastCode: string;
  lastType: string;
  article: string;
  lastStatus: string;
}

export interface CustomerFilters {
  page: number;
  pageSize: number;
  search?: string; // Client-side search hoặc API search nếu có
  status?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}