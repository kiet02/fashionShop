import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppIcon } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { useUser } from '../../../utils/user/UserContext';
import { SIZE } from '../../../utils/responsive/size';
import { fetchOrdersByUserId } from '../../../utils/fetchApi';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { KEY_API } from '../../../utils/fetchApi/api';
import { formatCurrency } from '../../../utils/helper/format';

export function OrderHistory() {
  const { color } = useAppTheme();
  const { user } = useUser();
  const navigation = useNavigation<any>();

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: [KEY_API.Orders, user?.id],
    queryFn: () => fetchOrdersByUserId(user?.id!),
    enabled: !!user?.id,
  });


  const renderOrderItem = ({ item }: { item: any }) => {
    const statusText = item.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán';

    return (
      <TouchableOpacity
        style={[styles.orderCard, { backgroundColor: color.card }]}
        onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
      >
        <View style={styles.orderHeader}>
          <AppText style={styles.orderId}>Đơn hàng #{item.id}</AppText>
          <View style={[styles.statusBadge, { backgroundColor: item.paymentStatus === 'PAID' ? '#E8F5E9' : '#FFF3E0' }]}>
            <AppText style={[styles.statusText, { color: item.paymentStatus === 'PAID' ? '#2E7D32' : '#E65100' }]}>
              {statusText}
            </AppText>
          </View>
        </View>

        <View style={styles.orderInfo}>
          <AppText style={[styles.infoLabel, { color: color.textSecondary }]}>Ngày đặt:</AppText>
          <AppText style={styles.infoValue}>{new Date(item.createAt).toLocaleDateString('vi-VN')}</AppText>
        </View>

        <View style={styles.orderInfo}>
          <AppText style={[styles.infoLabel, { color: color.textSecondary }]}>Tổng tiền:</AppText>
          <AppText style={[styles.infoValue, { color: color.base, fontWeight: 'bold' }]}>
            {formatCurrency(item.total)}
          </AppText>
        </View>

        <View style={styles.footer}>
          <AppText style={[styles.detailLink, { color: color.base }]}>Xem chi tiết</AppText>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'chevron-right' }} size={20} color={color.base} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'arrow-back' }} size={24} color={color.text} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Đơn hàng của tôi</AppText>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={color.base} />
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <AppIcon icon={{ type: 'MaterialIcons', name: 'shopping-basket' }} size={64} color={color.textSecondary} />
              <AppText style={[styles.emptyText, { color: color.textSecondary }]}>Bạn chưa có đơn hàng nào</AppText>
            </View>
          }
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
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
  list: {
    padding: SIZE.PAD_M,
  },
  orderCard: {
    borderRadius: 16,
    padding: SIZE.PAD_M,
    marginBottom: SIZE.MAR_M,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZE.MAR_M,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: SIZE.PAD_S,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: SIZE.MAR_S,
  },
  detailLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
});
