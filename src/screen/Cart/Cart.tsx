import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, StatusBar, } from 'react-native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { SIZE } from '../../utils/responsive/size';
import { useNavigation } from '@react-navigation/native';

import { CartItemType } from './types';
import { CartHeader } from './items/CartHeader';
import { CartShippingBanner } from './items/CartShippingBanner';
import { CartItemCard } from './items/CartItemCard';
import { CartSummary } from './items/CartSummary';
import { CartBottomBar } from './items/CartBottomBar';
import { CartEmpty } from './items/CartEmpty';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCart } from '../../utils/cart/CartContext';

// ── Helpers ────────────────────────────────────────────────
const formatCurrency = (value: number) =>
  value.toLocaleString('vi-VN') + 'đ';

export function Cart() {
  const { color } = useAppTheme();
  const navigation = useNavigation<any>();
  const { cart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const handleRemoveItem = (id: string) => {
    Alert.alert('Xoá sản phẩm', 'Bạn muốn xoá sản phẩm này khỏi giỏ hàng?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => removeFromCart(id),
      },
    ]);
  };

  const discount = 0; // Simplified for now
  const shippingFee = subtotal > 1000000 || cart.length === 0 ? 0 : 30000;
  const total = subtotal + shippingFee;

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: color.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={color.background} />

      <CartHeader totalItems={totalItems} />

      <CartShippingBanner subtotal={subtotal} formatCurrency={formatCurrency} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {cart.map(item => (
          <CartItemCard
            key={item.id}
            item={item}
            formatCurrency={formatCurrency}
            onUpdateQuantity={updateQuantity}
            onRemove={handleRemoveItem}
          />
        ))}

        <CartSummary
          subtotal={subtotal}
          discount={discount}
          shippingFee={shippingFee}
          total={total}
          totalItems={totalItems}
          formatCurrency={formatCurrency}
        />

        {/* Spacing for bottom button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <CartBottomBar
        total={total}
        totalItems={totalItems}
        formatCurrency={formatCurrency}
        onCheckout={() => navigation.navigate('Payment')}
      />
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZE.PAD_M,
    paddingTop: SIZE.PAD_M,
  },
});
