import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchRevenue, uploadImage } from '../fetch';
import { KEY_API } from '../api';

export const useRevenue = () => {
  return useQuery({
    queryKey: [KEY_API.Revenue],
    queryFn: fetchRevenue,
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImage(formData),
  });
};
