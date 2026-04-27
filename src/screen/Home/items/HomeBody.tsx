import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { HomeBodyCard } from './HomeBodyCard';
import { HomeBodySectionTitle } from './HomeBodySectionTitle';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';
import { BestProduct } from '../../../utils/fetchApi/type';

export function HomeBody({ data }: { data: BestProduct[] }) {
  const { language } = useAppLanguage();
  return (
    <View style={styles.container}>
      <HomeBodySectionTitle title={language.home.bestSellerTitle} />
      <FlashList
        data={data}
        renderItem={({ item }) => <HomeBodyCard data={item} />}
        keyExtractor={item => item.id as unknown as string}
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
