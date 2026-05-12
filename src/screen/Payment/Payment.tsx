/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, StatusBar } from 'react-native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { SIZE } from '../../utils/responsive/size';
import { PaymentMethodType } from './types';

import { PaymentHeader } from './items/PaymentHeader';
import { PaymentAddress } from './items/PaymentAddress';
import { PaymentOrderItems } from './items/PaymentOrderItems';
import { PaymentMethods } from './items/PaymentMethods';
import { PaymentSummary } from './items/PaymentSummary';
import { PaymentBottomBar } from './items/PaymentBottomBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../utils/cart/CartContext';
import { useUser } from '../../utils/user/UserContext';
import { fetchCreateOrder, fetchCreatePaymentUrl } from '../../utils/fetchApi';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../utils/helper/format';
import { useForm } from 'react-hook-form';

const PAYMENT_METHODS: PaymentMethodType[] = [
  { id: 'cod', label: 'Thanh toán khi nhận hàng', icon: 'local-atm', desc: 'Trả tiền mặt khi giao hàng' },
  { id: 'vnpay', label: 'Ví điện tử VNPay', icon: 'account-balance-wallet', desc: 'Thanh toán qua ứng dụng VNPay' },
];

// ── Helpers ────────────────────────────────────────────────

export function Payment() {
  const { color } = useAppTheme();
  const navigation = useNavigation<any>();
  const { cart, subtotal, totalItems, clearCart } = useCart();
  const { user } = useUser();
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const { setError, clearErrors, formState: { errors } } = useForm({
    values: {
      address: user?.address?.address || '',
    }
  });

  React.useEffect(() => {
    const hasAddress = user?.address?.city || user?.address?.address;
    if (hasAddress) {
      clearErrors('address');
    }
  }, [user?.address, clearErrors]);

  const shippingFee = subtotal > 1000000 || cart.length === 0 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = async () => {
    if (!user) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập để đặt hàng');
      return;
    }

    const hasAddress = user?.address?.street && user?.address?.city;
    if (!hasAddress) {
      setError('address', { message: 'Vui lòng cập nhật địa chỉ giao hàng để tiếp tục' });
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Lỗi', 'Giỏ hàng trống');
      return;
    }

    const orderData = {
      userId: user.id,
      items: cart.map(item => ({
        item: { id: parseInt(item.id.split('-')[1]) }, // Extract product item ID
        amount: item.quantity,
        price: item.price,
      })),
      shippingAddress: user.address || {
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: 'Chưa cập nhật địa chỉ'
      },
      paymentMethod: selectedPayment === 'cod' ? 'COD' : 'VNPAY',
      total: total,
    };

    try {
      const result = await fetchCreateOrder(orderData);
      if (selectedPayment === 'vnpay' && result?.id) {
        const { paymentUrl } = await fetchCreatePaymentUrl(result.id);
        if (paymentUrl) {
          navigation.navigate('VNPay', { url: paymentUrl, orderId: result.id });
        }
      } else {
        Alert.alert(
          'Thành công',
          'Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.',
          [{
            text: 'OK', onPress: () => {
              clearCart();
              navigation.navigate('BottomNavigation');
            }
          }]
        );
      }
    } catch (e) {
      console.error('Order failed:', e);
      Alert.alert('Lỗi', 'Đặt hàng thất bại. Vui lòng thử lại sau.');
    }
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: color.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={color.background} />

      <PaymentHeader />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <PaymentAddress
          address={user?.address?.street ? {
            name: user.name,
            phone: user.phoneNumber || '',
            address: `${user.address.street}, ${user.address.ward}, ${user.address.district}, ${user.address.city}`
          } : {
            name: user?.name || '',
            phone: user?.phoneNumber || '',
            address: 'Chưa có địa chỉ'
          }}
          error={errors.address?.message as string}
        />

        <PaymentOrderItems
          items={cart}
          totalItems={totalItems}
          formatCurrency={formatCurrency}
        />

        <PaymentMethods
          methods={PAYMENT_METHODS}
          selectedPayment={selectedPayment}
          onSelectPayment={setSelectedPayment}
        />

        <PaymentSummary
          totalItems={totalItems}
          subtotal={subtotal}
          shippingFee={shippingFee}
          total={total}
          formatCurrency={formatCurrency}
        />

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <PaymentBottomBar
        total={total}
        formatCurrency={formatCurrency}
        onPlaceOrder={handlePlaceOrder}
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
