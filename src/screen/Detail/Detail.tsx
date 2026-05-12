/* eslint-disable react/no-unstable-nested-components */
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { KEY_API } from '../../utils/fetchApi/api';
import { fetchProductDetail } from '../../utils/fetchApi';
import { DetailImage } from './items/DetailImage';
import { DetailTitle } from './items/DetailTitle';
import { DetailVariants } from './items/DetailVariants';
import { DetailDescription } from './items/DetailDescription';
import { CommentList } from '../comment/CommentList';
import { AppText } from '../../elements';
import { useRoute } from '@react-navigation/native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { NavigationStackProps, RouteStackProps } from '../../navigation/type';
import { useCart } from '../../utils/cart/CartContext';
import { ProductItem } from '../../utils/fetchApi/type';
import { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../elements';

export function Detail() {
  const { color } = useAppTheme();
  const { addToCart, totalItems } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductItem | undefined>();
  const navigation = useNavigation<NavigationStackProps>();
  const route = useRoute<RouteStackProps<'Detail'>['route']>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppIcon
          icon={{ type: 'MaterialIcons', name: 'shopping-cart' }}
          color={color.text}
          size={24}
          containerStyle={{ marginRight: 10 }}
          badge={totalItems}
          onPress={() => navigation.navigate('Cart')}
        />
      ),
    });
  }, [navigation, totalItems, color.text]);

  const { data, isLoading } = useQuery({
    queryKey: [KEY_API.Detail, route.params?.id],
    queryFn: () => fetchProductDetail(route.params?.id),
  });

  const handleAddToCart = () => {
    if (!data || !selectedVariant) return;

    const brand = data.categories?.find(c => c.type === 'brand')?.name ?? 'Generic';

    addToCart({
      id: `${data.id}-${selectedVariant.id}`,
      name: data.productName,
      brand: brand,
      price: data.price + (selectedVariant.bonusPrice || 0),
      image: selectedVariant.productImage || data.productImage,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity: 1,
    });
    Alert.alert('Đã thêm vào giỏ hàng!');
  };

  if (isLoading || !data) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: color.background }]}>
        <ActivityIndicator size="large" color={color.base} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DetailImage data={data.items ?? []} />
        <DetailTitle data={data} />
        <DetailVariants items={data.items ?? []} onVariantChange={setSelectedVariant} />
        <DetailDescription data={data} />
        <CommentList productId={data.id} />
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: color.card, borderTopColor: color.border }]}>
        <TouchableOpacity
          style={[styles.addToCartBtn, { backgroundColor: color.base }]}
          onPress={handleAddToCart}
        >
          <AppText style={styles.addToCartText}>Thêm vào giỏ hàng</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    gap: 8,
    paddingBottom: 24,
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 24, // Assuming some bottom safe area padding
  },
  addToCartBtn: {
    backgroundColor: '#EE4D2D',
    height: 48,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
