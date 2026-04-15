import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list'; // Import từ Shopify
import { HomeBodyCard } from './HomeBodyCard';
import { HomeBodySectionTitle } from './HomeBodySectionTitle';

export function HomeBody() {
  const bestSellers = Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    name: `Sản phẩm Hot ${index + 1}`,
    price: '990.000đ',
    sold: 'Đã bán 1k+',
  }));

  return (
    <View style={{ flex: 1, minHeight: 500 }}>
      <HomeBodySectionTitle title="Mua nhiều nhất" onPress={() => {}} />
      <FlashList
        data={bestSellers}
        renderItem={({ item }) => <HomeBodyCard data={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}
