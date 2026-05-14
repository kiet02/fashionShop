import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductDetail } from '../../../utils/fetchApi/type';
import { AppText, AppIcon } from '../../../elements';

export function DetailInfo({ data }: { data: ProductDetail }) {
  const { productName, price, marketPrice, productSummary } = data;

  const hasDiscount = marketPrice > price && marketPrice > 0;
  
  // Extract CPU, RAM, VGA from summary if possible
  const getSpec = (keyword: string) => {
    if (!productSummary) return null;
    const regex = new RegExp(`${keyword}[^<]*`, 'i');
    const match = productSummary.match(regex);
    if (match) {
      return match[0].replace(new RegExp(`^${keyword}\\s*:\\s*`, 'i'), '').trim();
    }
    return null;
  };

  const cpu = getSpec('CPU');
  const ram = getSpec('RAM');
  const vga = getSpec('VGA');

  return (
    <View style={styles.container}>
      <AppText style={styles.name}>{productName}</AppText>
      
      {/* Specs Chips */}
      <View style={styles.specsContainer}>
        {cpu && (
          <View style={styles.specChip}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'memory' }} size={16} color="#666" />
            <AppText style={styles.specText} numberOfLines={1}>{cpu}</AppText>
          </View>
        )}
        {ram && (
          <View style={styles.specChip}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'developer-board' }} size={16} color="#666" />
            <AppText style={styles.specText} numberOfLines={1}>{ram}</AppText>
          </View>
        )}
        {vga && (
          <View style={styles.specChip}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'videogame-asset' }} size={16} color="#666" />
            <AppText style={styles.specText} numberOfLines={1}>{vga}</AppText>
          </View>
        )}
      </View>

      <View style={styles.priceSection}>
        <AppText style={styles.price}>{formatCurrency(price)}</AppText>
        {hasDiscount && (
          <AppText style={styles.originalPrice}>{formatCurrency(marketPrice)}</AppText>
        )}
      </View>

      <View style={styles.warrantyBadge}>
        <AppText style={styles.warrantyText}>Bảo hành theo từng linh kiện</AppText>
      </View>
    </View>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 6,
    borderBottomColor: '#F0F4F8',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    lineHeight: 28,
    marginBottom: 12,
  },
  specsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  specText: {
    fontSize: 13,
    color: '#444',
    flex: 1,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 8,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0084FF', // Bright blue like mockup
  },
  originalPrice: {
    fontSize: 15,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  warrantyBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderStyle: 'dashed',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  warrantyText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: 'bold',
  },
});
