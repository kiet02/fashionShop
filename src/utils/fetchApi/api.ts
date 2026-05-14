import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const API = {
  // Auth
  Login: 'api/auth/login',
  Register: 'api/auth/register',

  // Product
  ProductsAll: 'api/product-all',
  ProductDetail: (id: string | number) => `api/product?productId=${id}`,
  Search: 'api/search',
  ProductCategory: 'api/product/category',
  UpdateProduct: (id: string | number) => `api/product?productId=${id}`,
  DeleteProduct: (id: string | number) => `api/product?productId=${id}`,
  UpdateStatusProduct: 'api/status-product',

  // Order
  Order: 'api/order',
  UpdateOrder: (id: string | number) => `api/order?orderId=${id}`,
  DeleteOrder: (id: string | number) => `api/order?orderId=${id}`,

  // VNPay
  VnpayCreatePayment: 'api/vnpay/create-payment',

  // Other
  CategoryBySlug: (slug: string) => `api/category?url=${slug}`,
  Upload: 'api/upload',
  Revenue: 'api/revenue',

  // Keeping old ones if they are still needed elsewhere, but prioritizing new ones
  Image: (imageName: string) => `api/v1/product/image/${imageName}`,
};

export const KEY_API = {
  Login: 'login',
  Register: 'register',
  Products: 'products',
  Detail: 'product-detail',
  Search: 'search',
  Order: 'order',
  Category: 'category',
  Revenue: 'revenue',
};
