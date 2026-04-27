export type BestProduct = {
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
  items: any | null;
  createAt: string | null;
  updateAt: string | null;
};

export type Products = {
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
  items: any | null;
  createAt: string | null;
  updateAt: string | null;
};

export type LoginFormData = {
  email: string;
  password: string;
};
export type ProductFilter = {
  gender?: string;
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
