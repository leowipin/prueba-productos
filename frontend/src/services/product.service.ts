import apiClient from './apiClient.service';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../interfaces/product.type';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get('/products');
    return response.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  async updateProduct(id: string, productData: UpdateProductRequest): Promise<Product> {
    const response = await apiClient.patch(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }
};
