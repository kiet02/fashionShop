import { createClient } from '@supabase/supabase-js';
import { VITE_SUPABASE_URL, VITE_SUPABASE_KEY, KEY_MMKV } from '@env';
import { createMMKV } from 'react-native-mmkv';
export const storage = createMMKV({
  id: 'user-storage',
  encryptionKey: KEY_MMKV,
});

const supabaseStorage = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.remove(key);
  },
};

// 3. Khởi tạo Supabase Client
export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
