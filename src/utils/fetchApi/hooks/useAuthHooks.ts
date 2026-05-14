import { useMutation } from '@tanstack/react-query';
import { fetchLogin, fetchRegister } from '../fetch';
import { KEY_API } from '../api';

export const useLogin = () => {
  return useMutation({
    mutationKey: [KEY_API.Login],
    mutationFn: (data: any) => fetchLogin(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: [KEY_API.Register],
    mutationFn: (data: any) => fetchRegister(data),
  });
};
