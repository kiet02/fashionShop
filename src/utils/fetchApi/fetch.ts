import { BestProduct, ProductDetail } from './type';
import { MOCK_PRODUCTS, MOCK_PRODUCT_DETAIL } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchLogin(email: string, password: string) {
  console.log('Mock Login:', email, password);
  await delay(500);
  return { status: 'success', token: 'mock-token' };
}

export async function fetchRegister(email: string, password: string) {
  console.log('Mock Register:', email, password);
  await delay(500);
  return { status: 'success' };
}

export async function fetchProductsHot(): Promise<BestProduct[]> {
  await delay(300);
  return MOCK_PRODUCTS;
}

export async function fetchProductDetail(id: number): Promise<ProductDetail> {
  await delay(300);
  // Return the mock detail, possibly matching ID if needed, but for now just the mock
  return { ...MOCK_PRODUCT_DETAIL, id };
}

export async function fetchProductsWithFilter(
  filter: any = {},
  searchQuery?: string,
): Promise<BestProduct[]> {
  await delay(300);
  let data = [...MOCK_PRODUCTS];

  if (searchQuery && searchQuery.trim() !== '') {
    const keyword = searchQuery.toLowerCase().trim();
    data = data.filter(product =>
      product.productName?.toLowerCase().includes(keyword),
    );
  }

  // Simple price filtering mock
  const hasMin = filter.minPrice !== undefined && filter.minPrice !== '';
  const hasMax = filter.maxPrice !== undefined && filter.maxPrice !== '';
  if (hasMin || hasMax) {
    const min = hasMin ? Number(filter.minPrice) : 0;
    const max = hasMax ? Number(filter.maxPrice) : Infinity;
    data = data.filter(p => p.price >= min && p.price <= max);
  }

  return data;
}
