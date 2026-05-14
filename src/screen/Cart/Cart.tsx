import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { AppText, AppIcon, AppImage, AppTextInput } from '../../elements';
import { useCart } from '../../utils/hooks/useCart';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NavigationStackProps } from '../../navigation/type';
import { useCreateOrder, useVnpayUrl } from '../../utils/fetchApi/hooks/useOrderHooks';

const schema = yup.object().shape({
  fullName: yup.string().required('Họ tên là bắt buộc'),
  phone: yup.string().required('Số điện thoại là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  address: yup.string().required('Địa chỉ nhận hàng là bắt buộc'),
  note: yup.string(),
  paymentMethod: yup.string().required('Vui lòng chọn phương thức thanh toán'),
});

type CheckoutForm = yup.InferType<typeof schema>;

export function Cart() {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
  const navigation = useNavigation<NavigationStackProps>();
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { mutate: getVnpayUrl, isPending: isGettingVnpay } = useVnpayUrl();

  const isPending = isCreatingOrder || isGettingVnpay;

  const { control, handleSubmit, setValue, watch } = useForm<CheckoutForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentMethod: 'COD',
    },
  });

  const selectedPayment = watch('paymentMethod');

  const onCheckout = (data: CheckoutForm) => {
    if (cartItems.length === 0) {
      Alert.alert('Lỗi', 'Giỏ hàng của bạn đang trống!');
      return;
    }

    const payload = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      address: data.address,
      note: data.note || '',
      orderDetail: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
    };

    if (data.paymentMethod === 'VNPAY') {
      // Call backend to get real VNPay URL
      getVnpayUrl({ amount: totalPrice }, {
        onSuccess: (res) => {
          navigation.navigate('PaymentWebView', { 
            url: res.paymentUrl,
            orderData: payload 
          });
        },
        onError: (err) => {
          Alert.alert('Lỗi', 'Không thể lấy link thanh toán: ' + err.message);
        }
      });
    } else {
      // COD: Create order immediately
      createOrder(payload, {
        onSuccess: () => {
          Alert.alert('Thành công', 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', [
            {
              text: 'OK',
              onPress: () => {
                clearCart();
                navigation.navigate('BottomNavigation');
              }
            }
          ]);
        },
        onError: (err) => {
          Alert.alert('Lỗi', 'Không thể tạo đơn hàng lúc này: ' + err.message);
        }
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* CART ITEMS */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Sản phẩm đã chọn ({cartItems.length})</AppText>
          {cartItems.length === 0 ? (
            <View style={styles.emptyCart}>
              <AppIcon icon={{ type: 'MaterialIcons', name: 'remove-shopping-cart' }} size={48} color="#ccc" />
              <AppText style={styles.emptyText}>Chưa có sản phẩm nào</AppText>
            </View>
          ) : (
            cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <AppImage source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <AppText style={styles.itemName} numberOfLines={2}>{item.productName}</AppText>
                  {item.summary ? (
                    <AppText style={styles.itemSummary} numberOfLines={1}>{item.summary}</AppText>
                  ) : null}
                  <View style={styles.priceRow}>
                    <AppText style={styles.itemPrice}>{formatPrice(item.price)}</AppText>
                    <AppText style={styles.itemQty}>x{item.quantity}</AppText>
                  </View>
                </View>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => removeFromCart(item.id)}>
                  <AppIcon icon={{ type: 'MaterialIcons', name: 'delete-outline' }} size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* CHECKOUT FORM */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Thông tin đặt hàng</AppText>
          <View style={styles.formContainer}>
            <AppTextInput control={control} name="fullName" placeholder="Họ và tên (*)" />
            <AppTextInput control={control} name="phone" placeholder="Số điện thoại (*)" keyboardType="phone-pad" />
            <AppTextInput control={control} name="email" placeholder="Email (*)" keyboardType="email-address" />
            <AppTextInput control={control} name="address" placeholder="Địa chỉ nhận hàng (*)" />
            <AppTextInput control={control} name="note" placeholder="Ghi chú thêm (không bắt buộc)" />
          </View>
        </View>

        {/* PAYMENT METHOD */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Phương thức thanh toán</AppText>

          <TouchableOpacity
            style={[styles.radioRow, selectedPayment === 'COD' && styles.radioRowActive]}
            onPress={() => setValue('paymentMethod', 'COD')}
          >
            <View style={styles.radioOuter}>
              {selectedPayment === 'COD' && <View style={styles.radioInner} />}
            </View>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'local-shipping' }} size={24} color="#555" />
            <AppText style={styles.radioText}>Thanh toán khi nhận hàng (COD)</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.radioRow, selectedPayment === 'VNPAY' && styles.radioRowActive]}
            onPress={() => setValue('paymentMethod', 'VNPAY')}
          >
            <View style={styles.radioOuter}>
              {selectedPayment === 'VNPAY' && <View style={styles.radioInner} />}
            </View>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'account-balance-wallet' }} size={24} color="#555" />
            <AppText style={styles.radioText}>Thanh toán qua ví VNPAY</AppText>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <AppText style={styles.totalLabel}>Tổng tiền:</AppText>
          <AppText style={styles.totalPrice}>{formatPrice(totalPrice)}</AppText>
        </View>
        <TouchableOpacity
          style={[styles.checkoutBtn, isPending && { opacity: 0.7 }]}
          onPress={handleSubmit(onCheckout)}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <AppText style={styles.checkoutText}>ĐẶT HÀNG</AppText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 12 },
  emptyCart: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  emptyText: { color: '#999', fontSize: 14 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12, borderWidth: 1, borderColor: '#eee' },
  itemInfo: { flex: 1, gap: 4 },
  itemName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  itemSummary: { fontSize: 12, color: '#666' },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: '#EF4444' },
  itemQty: { fontSize: 13, color: '#666' },
  deleteBtn: { padding: 8 },
  formContainer: { gap: 12 },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
    gap: 12,
  },
  radioRowActive: { borderColor: '#0084FF', backgroundColor: '#F0F8FF' },
  radioOuter: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#0084FF',
    alignItems: 'center', justifyContent: 'center'
  },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0084FF' },
  radioText: { flex: 1, fontSize: 14, color: '#333', fontWeight: '500' },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
  },
  totalContainer: { flex: 1 },
  totalLabel: { fontSize: 13, color: '#666' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#EF4444' },
  checkoutBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
