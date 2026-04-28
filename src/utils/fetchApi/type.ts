export interface ProductInventoryItem {
  id: number;
  size: string;
  color: string;
  productImage: string;
  bonusPrice: number;
  quantity: number;
}

export interface BaseProduct {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  sold: number;
  sale: number;
  description: string;
  rating: number;
  category: {
    gender: string;
    brand: string;
    category: string;
  };
  createAt: string | null;
  updateAt: string | null;
}
export interface ProductDetail {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  sale: number; // % giảm giá (0 = không giảm)
  sold: number;
  description: string;
  rating: number;
  categories: ProductCategory[];
  items: ProductItem[];
  createAt: string | null;
  updateAt: string | null;
}

export interface ProductCategory {
  id: number;
  name: string;
  type: 'gender' | 'brand' | 'category';
}

export interface ProductItem {
  id: number;
  size: string;
  color: string;
  productImage: string;
  bonusPrice: number;
  quantity: number;
}

export interface Product extends BaseProduct {
  items: ProductInventoryItem[] | null;
}

export type BestProduct = Product;
