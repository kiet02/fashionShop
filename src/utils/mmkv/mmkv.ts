import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();
const setItem = (key: string, value: string) => {
  storage.set(key, value);
};

const getItem = (key: string) => {
  return storage.getString(key);
};

const removeItem = (key: string) => {
  storage.remove(key);
};

export default {
  setItem,
  getItem,
  removeItem,
};
