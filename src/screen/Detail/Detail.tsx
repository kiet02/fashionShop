import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useProductDetail } from '../../utils/fetchApi';
import { DetailImage } from './items/DetailImage';
import { DetailDescription } from './items/DetailDescription';
import { AppText, AppIcon } from '../../elements';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { RouteStackProps, NavigationStackProps } from '../../navigation/type';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { DetailInfo } from './items/DetailInfo';
import { DetailOffers } from './items/DetailOffers';
import { DetailPolicies } from './items/DetailPolicies';
import { useCart } from '../../utils/hooks/useCart';

export function Detail() {
  const route = useRoute<RouteStackProps<'Detail'>['route']>();
  const navigation = useNavigation<NavigationStackProps>();
  const id = route.params?.id;
  const { color } = useAppTheme();

  const { addToCart, totalItems, loadCart } = useCart();
  const isFocused = useIsFocused();

  // Reload cart state when returning to screen
  React.useEffect(() => {
    if (isFocused) {
      loadCart();
    }
  }, [isFocused, loadCart]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Chi tiết sản phẩm',
      headerStyle: { backgroundColor: color.primary },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerRight: () => (
        <AppIcon
          icon={{ type: 'MaterialIcons', name: 'shopping-cart' }}
          color="#fff"
          size={24}
          badge={totalItems}
          onPress={() => navigation.navigate('Cart')}
        />
      ),
    });
  }, [navigation, totalItems, color]);

  const { data, isLoading } = useProductDetail(id);

  if (isLoading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002D5E" />
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(data);
  };

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DetailImage data={data.imageCollection ?? []} />
        <DetailInfo data={data} />
        <DetailOffers specialOffers={data.specialOffer || []} />
        <DetailPolicies />
        <DetailDescription data={data} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.contactBtn}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'call' }} color="#002D5E" size={22} />
          <AppText style={styles.contactText}>Gọi tư vấn</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <AppText style={styles.addToCartText}>THÊM VÀO GIỎ HÀNG</AppText>
          <AppText style={styles.addToCartSubText}>Giao hàng tận nơi nhanh chóng</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 24, // Safe area for iPhone
    gap: 8,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 10,
    color: '#002D5E',
    marginTop: 2,
    fontWeight: '500',
  },
  cartIconBtn: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#002D5E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  addToCartBtn: {
    flex: 2.5,
    backgroundColor: '#EF4444', // Red color from mockup
    height: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartSubText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 2,
  },
});
