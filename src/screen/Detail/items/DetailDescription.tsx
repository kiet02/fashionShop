import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductDetail } from '../../../utils/fetchApi/type';
import { AppText } from '../../../elements';

export function DetailDescription({ data }: { data: ProductDetail }) {
  if (!data.description && !data.productSummary) return null;

  const cleanSummary = data.productSummary?.replace(/<[^>]*>?/gm, '') || '';

  return (
    <View style={styles.container}>
      {!!data.productSummary && (
        <View style={styles.section}>
          <AppText style={styles.title}>Tóm tắt cấu hình</AppText>
          <AppText style={styles.content}>{cleanSummary.trim()}</AppText>
        </View>
      )}

      {!!data.warranty && (
        <View style={styles.section}>
          <AppText style={styles.title}>Bảo hành</AppText>
          <AppText style={styles.content}>{data.warranty}</AppText>
        </View>
      )}

      {!!data.description && (
        <View style={styles.section}>
          <AppText style={styles.title}>Mã mô tả / Chi tiết</AppText>
          <AppText style={styles.content}>{data.description}</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 16,
  },
  section: {
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#002D5E',
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});
