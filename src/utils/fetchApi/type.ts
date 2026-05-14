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
export interface ProductImage {
  id?: number;
  small: string;
  large: string;
  original?: string;
}

export interface ProductDetail {
  specialOffer: never[];
  id: number;
  productName: string;
  productSummary: string;
  productUrl: string;
  description: string;
  visit: number;
  rating: number;
  marketPrice: number;
  price: number;
  warranty: string;
  status: string;
  imageCollection: ProductImage[];
  productImage: ProductImage;
  createdAt: string;
  updatedAt: string;
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
