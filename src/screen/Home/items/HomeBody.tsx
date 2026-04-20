import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { HomeBodyCard } from './HomeBodyCard';
import { HomeBodySectionTitle } from './HomeBodySectionTitle';
import { BestSellerItem } from '../../../utils/fetchApi/type';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';

export function HomeBody({ data }: { data: BestSellerItem[] }) {
  const { language } = useAppLanguage();
  return (
    <View style={styles.container}>
      <HomeBodySectionTitle title={language.home.bestSellerTitle} />
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
