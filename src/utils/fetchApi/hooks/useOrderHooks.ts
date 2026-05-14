import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, createOrder, updateOrder, deleteOrder, fetchVnpayUrl } from '../fetch';
import { KEY_API } from '../api';

export const useOrders = () => {
  return useQuery({
    queryKey: [KEY_API.Order],
    queryFn: fetchOrders,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_API.Order] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string | number; status: string }) =>
      updateOrder(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_API.Order] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_API.Order] });
    },
  });
};

export const useVnpayUrl = () => {
  return useMutation({
    mutationFn: ({ amount, orderId }: { amount: number; orderId?: number }) =>
      fetchVnpayUrl(amount, orderId),
  });
};
