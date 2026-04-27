import { LOCALHOST } from '@env';
import { API } from './api';
import { BestProduct } from './type';

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

export async function fetchProductsWithFilter(
  filter: any = {},
  searchQuery?: string,
): Promise<BestProduct[]> {
  // Đường dẫn cố định gọi đến API filter của backend
  const path = 'api/v1/product/filter';
  const params = new URLSearchParams();

  // 1. CHỈ XỬ LÝ CÁC PARAMS MÀ BACKEND HIỂU (Price và Filter)
  const hasMin = filter.minPrice !== undefined && filter.minPrice !== '';
  const hasMax = filter.maxPrice !== undefined && filter.maxPrice !== '';

  if (hasMin || hasMax) {
    const min = hasMin ? filter.minPrice : '0';
    const max = hasMax ? filter.maxPrice : '2147483647'; // Max integer của Java
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

  // 2. GỌI API LẤY DANH SÁCH SẢN PHẨM TỪ BACKEND
  const data: BestProduct[] = await fetchApi(finalPath, {
    method: 'GET',
  });

  // Nếu API lỗi hoặc không có data, trả về mảng rỗng
  if (!data || !Array.isArray(data)) {
    return [];
  }

  // 3. XỬ LÝ TÌM KIẾM BẰNG JAVASCRIPT Ở FRONTEND
  if (searchQuery && searchQuery.trim() !== '') {
    const keyword = searchQuery.toLowerCase().trim();
    // Lọc lại mảng data vừa nhận được: chỉ lấy sản phẩm có tên chứa từ khóa
    return data.filter(product =>
      product.productName?.toLowerCase().includes(keyword),
    );
  }

  // Nếu không có search query, trả về toàn bộ data backend đã filter
  return data;
}
