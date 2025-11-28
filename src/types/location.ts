export interface Location {
  id: string;
  locationCode: string;
  locationName: string;
  locationType: 'Production' | 'Development' | 'Quality' | 'Storage'; // Based on typical types
  isActive: boolean;
  createdAt?: string;
}

export interface LocationFilters {
  page: number;
  pageSize: number;
  locationType?: string;
  isActive?: boolean;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}