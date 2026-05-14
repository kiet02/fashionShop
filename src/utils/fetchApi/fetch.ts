import { API, BASE_URL } from './api';
import { BestProduct, ProductDetail } from './type';

const getHeaders = (isFormData = false) => {
  const headers: HeadersInit_ = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  // Add Authorization header here if needed: headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export async function fetchLogin(data: any) {
  const response = await fetch(`${BASE_URL}/${API.Login}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function fetchRegister(data: any) {
  const response = await fetch(`${BASE_URL}/${API.Register}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function fetchProductsAll(): Promise<BestProduct[]> {
  const response = await fetch(`${BASE_URL}/${API.ProductsAll}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function fetchProductDetail(id: string | number): Promise<ProductDetail> {
  const response = await fetch(`${BASE_URL}/${API.ProductDetail(id)}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function fetchSearchProducts(query: string, filters?: any): Promise<BestProduct[]> {
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (filters) {
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.filter) {
      Object.entries(filters.filter).forEach(([key, value]) => {
        if (value) params.append(key, value as string);
      });
    }
  }

  const response = await fetch(`${BASE_URL}/${API.Search}?${params.toString()}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function fetchOrders() {
  const response = await fetch(`${BASE_URL}/${API.Order}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function createOrder(orderData: any) {
  const response = await fetch(`${BASE_URL}/${API.Order}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(orderData),
  });
  return handleResponse(response);
}

export async function fetchVnpayUrl(amount: number, orderId?: number) {
  const response = await fetch(`${BASE_URL}/${API.VnpayCreatePayment}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ amount, orderId }),
  });
  return handleResponse(response);
}

export async function updateOrder(id: string | number, status: string) {
  const response = await fetch(`${BASE_URL}/${API.UpdateOrder(id)}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
}

export async function deleteOrder(id: string | number) {
  const response = await fetch(`${BASE_URL}/${API.DeleteOrder(id)}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function fetchRevenue() {
  const response = await fetch(`${BASE_URL}/${API.Revenue}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function uploadImage(formData: FormData) {
  const response = await fetch(`${BASE_URL}/${API.Upload}`, {
    method: 'POST',
    headers: getHeaders(true),
    body: formData,
  });
  return handleResponse(response);
}
