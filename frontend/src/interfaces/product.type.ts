export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
}
