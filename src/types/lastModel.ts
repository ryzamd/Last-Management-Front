export interface LastModel {
  id?: string;
  modelName: string;
  description?: string;
  status: 'Active' | 'Inactive';
  createdAt?: string;
}

export interface LastNameModel {
  id: string;
  lastNameId: string;
  lastModelId: string;
  lastCode?: string;
  modelName?: string;
  createdAt?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}