import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from './supabase/supabase';
import { BestSellerItem, LoginFormData } from './type';
import { AccessToken, LoginManager, } from 'react-native-fbsdk-next';

export const QUERY_KEY = {
  ITEMS: 'items',
};

export async function fetchData({
  pageParam,
}: {
  pageParam: { from: number; to: number };
}): Promise<BestSellerItem[]> {
  const { from, to } = pageParam;
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .range(from, to)
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}



export async function supabaseLogin(data: LoginFormData) {
  if (!supabase) {
    throw new Error('Supabase client chưa được khởi tạo thành công.');
  }
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      throw error;
    }
    return { authData, error };
  } catch (error: any) {
    console.error('Login Process Error:', error.message);
    throw error;
  }
}

export async function supabaseRegister(data: LoginFormData) {
  if (!supabase) {
    throw new Error('Supabase client chưa được khởi tạo thành công.');
  }
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      throw error;
    }
    return { authData, error };
  } catch (error: any) {
    console.error('Registration Process Error:', error.message);
    throw error;
  }
}

export async function supabaseLogout() {
  if (!supabase) {
    throw new Error('Supabase client chưa được khởi tạo thành công.');
  }
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error('Logout Process Error:', error.message);
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    const { data } = await GoogleSignin.signIn();
    if (data?.idToken) {
      const { data: success, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: data.idToken,
      });
      
      if (error) throw error;
      return { success, error };
    }
  } catch (error: any) {
    console.error('Lỗi login:', error.message);
  }
}

export async function signInWithFacebook() {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) return;
    const data = await AccessToken.getCurrentAccessToken();
    if (data) {
      const { data: success, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      });
      supabase;
      if (error) {
        console.error('Error signing in with Facebook:', error.message);
        return;
      }
      if (error) throw error;
   
      return { success, error };
    }
  } catch (error: any) {
    console.log('Lỗi chi tiết:', error.message);
  }
}
