import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductDetail } from '../../../utils/fetchApi/type';
import { AppText } from '../../../elements';

export function DetailDescription({ data }: { data: ProductDetail }) {
  if (!data.description) return null;

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Mô tả sản phẩm</AppText>
      <AppText style={styles.content}>
        {data.description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});
