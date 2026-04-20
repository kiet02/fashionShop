import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { HomeBodyCard } from './HomeBodyCard';
import { HomeBodySectionTitle } from './HomeBodySectionTitle';
import { BestSellerItem } from '../../../utils/fetchApi/type';

export function HomeBody({ data }: { data: BestSellerItem[] }) {
  return (
    <View style={styles.container}>
      <HomeBodySectionTitle title="Mua nhiều nhất" onPress={() => {}} />
      <FlashList
        data={data}
        renderItem={({ item }) => <HomeBodyCard data={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.containerFlastList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 500,
  },
  containerFlastList: {
    paddingHorizontal: 16,
  },
  itemSeparator: {
    height: 16,
  },
});
