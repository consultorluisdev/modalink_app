export interface BaseResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description?: string;
  stock: number;
  images?: string[];
  category?: ProductCategory;
  createdAt: string;
  updatedAt: string;
}
