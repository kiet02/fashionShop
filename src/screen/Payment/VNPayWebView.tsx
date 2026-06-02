import React, { useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteStackProps } from '../../navigation/type';
import { useCart } from '../../utils/cart/CartContext';
import { useAppTheme } from '../../utils/theme/useAppTheme';

export function VNPayWebView({ route, navigation }: RouteStackProps<'VNPay'>) {
  const { url } = route.params;
  const { color } = useAppTheme();
  const { clearCart } = useCart();
  const hasHandledPayment = useRef(false);

  const handleNavigationStateChange = (navState: any) => {
    const { url: currentUrl } = navState;
    if (currentUrl.includes('/api/v1/payment/vnpay-payment-return')) {
      if (!hasHandledPayment.current) {
        hasHandledPayment.current = true;
        Alert.alert(
          'Thông báo',
          'Giao dịch đã được xử lý. Vui lòng kiểm tra trạng thái đơn hàng trong mục Lịch sử.',
          [{
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('BottomNavigation');
            }
          }]
        );
      }
    }
  };
  const onLoadingError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);

    if (nativeEvent.url && nativeEvent.url.includes('/api/v1/payment/vnpay-payment-return')) {
      if (!hasHandledPayment.current) {
        hasHandledPayment.current = true;
        Alert.alert(
          'Thông báo',
          'Giao dịch đã được xử lý. Vui lòng kiểm tra trạng thái đơn hàng trong mục Lịch sử.',
          [{
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('BottomNavigation');
            }
          }]
        );
      }
      return;
    }

    Alert.alert('Lỗi', 'Không thể tải trang thanh toán. Vui lòng thử lại.');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
        onError={onLoadingError}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        )}
        onLoadEnd={(navState) => {
          const currentUrl = navState.nativeEvent.url;
          if (currentUrl.includes('/api/v1/payment/vnpay-payment-return')) {
            if (!hasHandledPayment.current) {
              hasHandledPayment.current = true;
              Alert.alert(
                'Thông báo',
                'Giao dịch đã được xử lý. Vui lòng kiểm tra trạng thái đơn hàng trong mục Lịch sử.',
                [{
                  text: 'OK',
                  onPress: () => {
                    clearCart();
                    navigation.navigate('BottomNavigation');
                  }
                }]
              );
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
