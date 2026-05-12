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

  // Handle empty response body
  if (!text || text.trim() === '') {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.log('JSON Parse Error:', e, 'Text:', text);
    return {};
  }
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

export async function fetchSignup(payload: any, image?: any) {
  const formData = new FormData();

  // Chỉ gửi part image nếu có dữ liệu ảnh thật sự
  if (image && image.uri) {
    formData.append('image', image);
  }

  // Append data (userInfo) dưới dạng string JSON
  const dataString = JSON.stringify(payload);
  console.log('Sending multipart data part:', dataString);
  formData.append('data', dataString);

  const response = await fetch(`${LOCALHOST}/${API.Register}`, {
    method: 'POST',
    body: formData,
  });

  const text = await response.text();
  console.log('Server Raw Response:', text);

  if (!response.ok) {
    throw new Error(text || `Error: ${response.status}`);
  }

  try {
    return text ? JSON.parse(text) : {};
  } catch (e) {
    console.error('Parse JSON Error:', e);
    return {};
  }
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
export function fetchOrdersByUserId(userId: number): Promise<any[]> {
  return fetchApi(`api/v1/order/user/${userId}`, {
    method: 'GET',
  });
}

export function fetchCreateOrder(orderData: any): Promise<any> {
  return fetchApi('api/v1/order/new', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export function fetchCreatePaymentUrl(orderId: number): Promise<{ paymentUrl: string }> {
  return fetchApi(`api/v1/payment/create-payment?orderId=${orderId}`, {
    method: 'POST',
  });
}

export function fetchUpdateAccount(userData: any): Promise<any> {
  const formData = new FormData();
  formData.append('data', JSON.stringify(userData));
  // If we had an image, we would append it here

  return fetchApi('api/v1/user/update', {
    method: 'PUT',
    body: formData,
  });
}

export function fetchUpdateAddress(userId: number, addressData: any): Promise<any> {
  return fetchApi(`api/v1/user/${userId}/address/update`, {
    method: 'PUT',
    body: JSON.stringify(addressData),
  });
}

export function fetchOrderDetail(orderId: number): Promise<any> {
  return fetchApi(`api/v1/order/${orderId}`, {
    method: 'GET',
  });
}

export function fetchProductReviews(productId: number): Promise<any[]> {
  return fetchApi(API.Reviews(productId), {
    method: 'GET',
  });
}

export function fetchCheckBuy(userId: number, productId: number): Promise<boolean> {
  return fetchApi(API.CheckBuyCart(userId, productId), {
    method: 'GET',
  });
}

export function fetchUserReview(productId: number, userId: number): Promise<any> {
  return fetchApi(API.UserReview(productId, userId), {
    method: 'GET',
  });
}

export function fetchCreateReview(reviewData: {
  productId: number;
  rating: number;
  comment: string;
  image?: string | null;
  user: { id: number };
}): Promise<any> {
  return fetchApi(API.CreateReview(), {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
}

export function fetchUserFullInfo(userId: number): Promise<any> {
  return fetchApi(`api/v1/user/${userId}/full`, {
    method: 'GET',
  });
}
