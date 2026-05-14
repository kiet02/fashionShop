import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteStackProps, NavigationStackProps } from '../../navigation/type';
import { useCart } from '../../utils/hooks/useCart';
import { useCreateOrder } from '../../utils/fetchApi/hooks/useOrderHooks';
import { AppText } from '../../elements';

export function PaymentWebView() {
  const route = useRoute<RouteStackProps<'PaymentWebView'>['route']>();
  const navigation = useNavigation<NavigationStackProps>();
  const url = route.params?.url;
  const orderData = route.params?.orderData;
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const { mutate: createOrder, isPending } = useCreateOrder();

  // We consider any url containing 'vnp_ResponseCode' as the return URL
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url: currentUrl } = navState;
    
    if (currentUrl.includes('vnp_ResponseCode')) {
      // Parse URL to get vnp_ResponseCode
      const regex = /[?&]vnp_ResponseCode=([^&#]*)/;
      const match = regex.exec(currentUrl);
      const responseCode = match ? match[1] : null;

      if (responseCode === '00') {
        // Payment success! Now create the order
        if (orderData) {
          createOrder(orderData, {
            onSuccess: () => {
              Alert.alert('Thành công', 'Thanh toán và tạo đơn hàng thành công!', [
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
              Alert.alert('Lỗi', 'Thanh toán thành công nhưng không tạo được đơn hàng: ' + err.message);
            }
          });
        } else {
          Alert.alert('Thành công', 'Thanh toán thành công!', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('BottomNavigation');
              }
            }
          ]);
        }
      } else {
        Alert.alert('Thất bại', 'Thanh toán VNPay thất bại hoặc đã bị huỷ.', [
          {
            text: 'Quay lại',
            onPress: () => {
              navigation.goBack();
            }
          }
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: url }} 
        style={styles.webview} 
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      { (loading || isPending) && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#002D5E" />
          {isPending && <AppText style={{ marginTop: 10 }}>Đang tạo đơn hàng...</AppText>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  webview: { flex: 1 },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  }
});

