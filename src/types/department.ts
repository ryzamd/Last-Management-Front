export interface Department {
  id: string;
  departmentCode: string;
  departmentName: string;
  departmentType: 'Production' | 'Development' | 'Quality' | 'Storage';
  isActive: boolean;
  createdAt?: string;
}

export interface DepartmentFilters {
  page: number;
  pageSize: number;
  departmentType?: string;
  isActive?: boolean;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}