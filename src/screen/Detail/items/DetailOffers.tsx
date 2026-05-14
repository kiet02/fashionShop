import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../elements';

export function DetailOffers({ specialOffers }: { specialOffers?: any[] }) {
  // Use mock data if API returns empty array, to show UI design
  const offers = specialOffers && specialOffers.length > 0
    ? specialOffers
    : [
      { id: 1, text: 'Tặng ngay bộ phím chuột và bàn di chuột + 5 mét dây mạng khi mua cấu hình PC trên' },
      { id: 2, text: 'Giảm ngay 100.000đ khi mua thêm Màn Hình Máy Tính.' },
      { id: 3, text: 'Giảm ngay 200.000đ khi mua thêm RAM' },
    ];

  if (!offers || offers.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <AppText style={styles.headerText}>Quà tặng và ưu đãi kèm theo</AppText>
        </View>
        <View style={styles.body}>
          {offers.map((offer, index) => (
            <View key={offer.id || index} style={styles.itemRow}>
              <AppText style={styles.icon}>⭐</AppText>
              <AppText style={styles.itemText}>{offer.text || offer}</AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 6,
    borderBottomColor: '#F0F4F8',
  },
  card: {
    backgroundColor: '#FFF8F0', // Pale orange/yellow
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#FFE4E1', // Pale red/pink
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  headerText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  body: {
    padding: 12,
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  icon: {
    fontSize: 14,
    marginTop: 2,
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
});
