import { useQuery } from '@tanstack/react-query';
import { fetchProductsAll, fetchProductDetail, fetchSearchProducts } from '../fetch';
import { KEY_API } from '../api';

export const useProducts = () => {
  return useQuery({
    queryKey: [KEY_API.Products],
    queryFn: fetchProductsAll,
  });
};

export const useProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: [KEY_API.Detail, id],
    queryFn: () => fetchProductDetail(id),
    enabled: !!id,
  });
};

export const useSearchProducts = (query: string, filters?: any) => {
  return useQuery({
    queryKey: [KEY_API.Search, query, filters],
    queryFn: () => fetchSearchProducts(query, filters),
    enabled: true, // Allow fetching even if query is empty (to show all products or filtered products)
  });
};
