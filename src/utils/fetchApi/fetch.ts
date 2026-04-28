import { LOCALHOST } from '@env';
import { API } from './api';
import { BestProduct, ProductDetail } from './type';

const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${LOCALHOST}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  const text = await response.text();

  if (!response.ok) {
    console.log('ERROR BODY:', text);
    throw new Error(`Error fetching API: ${response.status}`);
  }

  return JSON.parse(text);
};

export function fetchLogin(email: string, password: string) {
  return fetchApi(API.Login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function fetchRegister(email: string, password: string) {
  return fetchApi(API.Register, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function fetchProductsHot(): Promise<BestProduct[]> {
  return fetchApi(API.Hot, {
    method: 'GET',
  });
}
export function fetchProductDetail(id: number): Promise<ProductDetail> {
  return fetchApi(API.ProductDetail(id), {
    method: 'GET',
  });
}

export async function fetchProductsWithFilter(
  filter: any = {},
  searchQuery?: string,
): Promise<BestProduct[]> {
  const path = 'api/v1/product/filter';
  const params = new URLSearchParams();
  const hasMin = filter.minPrice !== undefined && filter.minPrice !== '';
  const hasMax = filter.maxPrice !== undefined && filter.maxPrice !== '';

  if (hasMin || hasMax) {
    const min = hasMin ? filter.minPrice : '0';
    const max = hasMax ? filter.maxPrice : '2147483647';
    params.append('price', `${min},${max}`);
  }

  Object.entries(filter).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      key !== 'minPrice' &&
      key !== 'maxPrice' &&
      key !== 'filter'
    ) {
      params.append(key, value.toString());
    }
  });

  const queryString = params.toString();
  const finalPath = queryString ? `${path}?${queryString}` : path;

  const data: BestProduct[] = await fetchApi(finalPath, {
    method: 'GET',
  });
  if (!data || !Array.isArray(data)) {
    return [];
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const keyword = searchQuery.toLowerCase().trim();
    return data.filter(product =>
      product.productName?.toLowerCase().includes(keyword),
    );
  }

  return data;
}
