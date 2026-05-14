import { useState, useEffect, useCallback } from 'react';
import { storage } from '../mmkv/mmkv';

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  image: string;
  summary: string;
  quantity: number;
}

const CART_KEY = 'cartItems';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from MMKV on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = useCallback(() => {
    const data = storage.getString(CART_KEY);
    if (data) {
      try {
        setCartItems(JSON.parse(data));
      } catch (e) {
        console.error('Failed to parse cart data', e);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    storage.set(CART_KEY, JSON.stringify(items));
    setCartItems(items);
  };

  const addToCart = (product: any, quantity: number = 1) => {
    const items = [...cartItems];
    const existingIndex = items.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity;
    } else {
      // parse summary for UI
      let summary = '';
      if (product.productSummary) {
        const cpuMatch = product.productSummary.match(/CPU[^<]*/i);
        const ramMatch = product.productSummary.match(/RAM[^<]*/i);
        const vgaMatch = product.productSummary.match(/VGA[^<]*/i);
        const cpu = cpuMatch ? cpuMatch[0].replace(/CPU\s*:\s*/i, '').trim() : '';
        const ram = ramMatch ? ramMatch[0].replace(/RAM\s*:\s*/i, '').trim() : '';
        const vga = vgaMatch ? vgaMatch[0].replace(/VGA\s*:\s*/i, '').trim() : '';
        summary = [cpu, ram, vga].filter(Boolean).join(' | ');
      }

      // get image
      let image = '';
      if (product.imageCollection && product.imageCollection.length > 0) {
        image = product.imageCollection[0].small || product.imageCollection[0].large;
      }

      items.push({
        id: product.id,
        productName: product.productName,
        price: product.price,
        image,
        summary,
        quantity,
      });
    }

    saveCart(items);
  };

  const removeFromCart = (id: number) => {
    const items = cartItems.filter(item => item.id !== id);
    saveCart(items);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    loadCart, // Export this to manually refresh if needed
  };
};
