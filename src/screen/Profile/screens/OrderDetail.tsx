import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppIcon } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { fetchOrderDetail, fetchUserReview } from '../../../utils/fetchApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { KEY_API } from '../../../utils/fetchApi/api';
import { API } from '../../../utils/fetchApi/api';
import { LOCALHOST } from '@env';
import { formatCurrency } from '../../../utils/helper/format';
import { useUser } from '../../../utils/user/UserContext';

// Component con để mỗi sản phẩm tự kiểm tra trạng thái review
function OrderProductItem({ item, color, navigation }: { item: any; color: any; navigation: any }) {
  const { user } = useUser();

  const productId = item.item.product?.id;

  const { data: existingReview } = useQuery({
    queryKey: ['user-review', productId, user?.id],
    queryFn: () => fetchUserReview(productId, user?.id as number),
    enabled: !!user?.id && !!productId,
  });

  const hasReviewed = !!existingReview;

  return (
    <View style={styles.productItem}>
      <Image
        source={{ uri: `${LOCALHOST}/${API.Image(item.item.productImage)}` }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <AppText style={styles.productName} numberOfLines={1}>{item.item.productName}</AppText>
        <AppText style={styles.productVariant}>Màu: {item.item.color}, Size: {item.item.size}</AppText>
        <View style={styles.productPriceRow}>
          <AppText style={styles.productPrice}>{formatCurrency(item.price)}</AppText>
          <AppText style={styles.productQuantity}>x{item.amount}</AppText>
        </View>
        <TouchableOpacity
          style={[styles.reviewBtn, hasReviewed && styles.reviewBtnEdited]}
          onPress={() => {
            navigation.navigate('WriteReview' as never, {
              productId: productId,
              productName: item.item.product?.productName || item.item.productName,
            } as never);
          }}
        >
          <AppIcon
            icon={{ type: 'MaterialIcons', name: hasReviewed ? 'edit' : 'rate-review' }}
            size={14}
            color={hasReviewed ? '#2E7D32' : '#FF5722'}
          />
          <AppText style={[styles.reviewBtnText, hasReviewed && { color: '#2E7D32' }]}>
            {hasReviewed ? 'Sửa đánh giá' : 'Đánh giá'}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function OrderDetail() {
  const { color } = useAppTheme();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { orderId } = route.params;

  const { data: order, isLoading } = useQuery({
    queryKey: [KEY_API.Orders, orderId],
    queryFn: () => fetchOrderDetail(orderId),
  });
  console.log("order", order);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: color.background }]}>
        <ActivityIndicator size="large" color={color.base} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'arrow-back' }} size={24} color={color.text} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Chi tiết đơn hàng</AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: color.card }]}>
          <View style={styles.sectionHeader}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'receipt' }} size={20} color={color.base} />
            <AppText style={styles.sectionTitle}>Thông tin đơn hàng</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.label}>Mã đơn hàng:</AppText>
            <AppText style={styles.value}>#{order.id}</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.label}>Ngày đặt:</AppText>
            <AppText style={styles.value}>{new Date(order.createAt).toLocaleDateString('vi-VN')}</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.label}>Trạng thái:</AppText>
            <AppText style={[styles.value, { color: order.paymentStatus === 'PAID' ? '#2E7D32' : order.paymentMethod === 'VNPAY' ? '#1565C0' : '#E65100', fontWeight: 'bold' }]}>
              {order.paymentStatus === 'PAID' ? 'Đã hoàn thành' : order.paymentMethod === 'VNPAY' ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </AppText>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: color.card }]}>
          <View style={styles.sectionHeader}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'location-on' }} size={20} color={color.base} />
            <AppText style={styles.sectionTitle}>Địa chỉ giao hàng</AppText>
          </View>
          <AppText style={styles.userName}>{order.shippingAddress?.name}</AppText>
        </View>

        <View style={[styles.section, { backgroundColor: color.card }]}>
          <View style={styles.sectionHeader}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'shopping-basket' }} size={20} color={color.base} />
            <AppText style={styles.sectionTitle}>Danh sách sản phẩm</AppText>
          </View>
          {order.items?.map((item: any, index: number) => (
            order.paymentStatus === 'PAID' ? (
              <OrderProductItem
                key={index}
                item={item}
                color={color}
                navigation={navigation}
              />
            ) : (
              <View key={index} style={styles.productItem}>
                <Image
                  source={{ uri: `${LOCALHOST}/${API.Image(item.item.productImage)}` }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <AppText style={styles.productName} numberOfLines={1}>{item.item.productName}</AppText>
                  <AppText style={styles.productVariant}>Màu: {item.item.color}, Size: {item.item.size}</AppText>
                  <View style={styles.productPriceRow}>
                    <AppText style={styles.productPrice}>{formatCurrency(item.price)}</AppText>
                    <AppText style={styles.productQuantity}>x{item.amount}</AppText>
                  </View>
                </View>
              </View>
            )
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: color.card }]}>
          <View style={styles.totalRow}>
            <AppText style={styles.totalLabel}>Tổng tiền hàng:</AppText>
            <AppText style={styles.totalValue}>{formatCurrency(order.total)}</AppText>
          </View>
          <View style={styles.totalRow}>
            <AppText style={styles.totalLabel}>Phí vận chuyển:</AppText>
            <AppText style={styles.totalValue}>{formatCurrency(0)}</AppText>
          </View>
          <View style={[styles.totalRow, { marginTop: 10, borderTopWidth: 0.5, borderTopColor: '#eee', paddingTop: 10 }]}>
            <AppText style={styles.grandTotalLabel}>Tổng thanh toán:</AppText>
            <AppText style={styles.grandTotalValue}>{formatCurrency(order.total)}</AppText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.PAD_M,
    height: 56,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: SIZE.PAD_M,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    borderRadius: 16,
    padding: SIZE.PAD_M,
    marginBottom: SIZE.MAR_M,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SIZE.MAR_M,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userAddress: {
    fontSize: 14,
    lineHeight: 20,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: SIZE.MAR_M,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    flex: 1,
    marginLeft: SIZE.MAR_M,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  productVariant: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productQuantity: {
    fontSize: 12,
    color: '#666',
  },
  reviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 12,
  },
  reviewBtnEdited: {
    borderColor: '#2E7D32',
  },
  reviewBtnText: {
    fontSize: 12,
    color: '#FF5722',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
});
