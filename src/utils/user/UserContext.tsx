import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../mmkv/mmkv';

export interface UserType {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  phoneNumber?: string;
  gender?: string;
  address?: any;
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserType | null>(null);

  useEffect(() => {
    const savedUser = storage.getString('user');
    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const setUser = (newUser: UserType | null) => {
    setUserState(newUser);
    if (newUser) {
      storage.set('user', JSON.stringify(newUser));
    } else {
      // In some versions of MMKV it is delete, in others remove. 
      // Based on mmkv.ts, let's ensure we use the right one.
      try {
        storage.delete('user');
      } catch (e) {
        (storage as any).remove?.('user');
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
