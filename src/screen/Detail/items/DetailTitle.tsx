import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductDetail } from '../../../utils/fetchApi/type';
import { AppText } from '../../../elements';

export function DetailTitle({ data }: { data: ProductDetail }) {
  const { productName, price, sale, sold, rating } = data;

  const hasDiscount = sale > 0;
  const discountedPrice = hasDiscount ? price * (1 - sale / 100) : price;

  const brand = data.categories?.find(c => c.type === 'brand')?.name ?? '';

  return (
    <View style={styles.container}>
      {/* GIÁ */}
      <View style={styles.priceRow}>
        <AppText style={styles.price}>
          {formatCurrency(discountedPrice)}
        </AppText>
        {hasDiscount && (
          <>
            <AppText style={styles.originalPrice}>
              {formatCurrency(price)}
            </AppText>
            <View style={styles.discountBadge}>
              <AppText style={styles.discountText}>-{sale}%</AppText>
            </View>
          </>
        )}
      </View>

      {/* TÊN SẢN PHẨM */}
      <AppText style={styles.name} numberOfLines={3}>
        {productName}
      </AppText>

      {/* BRAND */}
      {!!brand && (
        <View style={styles.brandRow}>
          <AppText style={styles.brandLabel}>Thương hiệu: </AppText>
          <AppText style={styles.brandValue}>{brand.toUpperCase()}</AppText>
        </View>
      )}

      {/* RATING + ĐÃ BÁN */}
      <View style={styles.metaRow}>
        <View style={styles.ratingWrapper}>
          <AppText style={styles.ratingValue}>{rating.toFixed(1)}</AppText>
          <View style={styles.starsRow}>
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.floor(rating);
              const half = !filled && i < rating;
              return (
                <AppText
                  key={i}
                  style={[
                    styles.star,
                    filled
                      ? styles.starFilled
                      : half
                      ? styles.starHalf
                      : styles.starEmpty,
                  ]}
                >
                  ★
                </AppText>
              );
            })}
          </View>
        </View>

        <View style={styles.divider} />

        <AppText style={styles.metaText}>
          Đã bán <AppText style={styles.metaHighlight}>{formatCount(sold)}</AppText>
        </AppText>
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

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EE4D2D',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FFF0ED',
    borderWidth: 1,
    borderColor: '#EE4D2D',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EE4D2D',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
    lineHeight: 22,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLabel: {
    fontSize: 13,
    color: '#757575',
  },
  brandValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EE4D2D',
    textDecorationLine: 'underline',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  star: {
    fontSize: 13,
  },
  starFilled: { color: '#FFA534' },
  starHalf: { color: '#FFC87A' },
  starEmpty: { color: '#D9D9D9' },
  metaText: {
    fontSize: 13,
    color: '#757575',
  },
  metaHighlight: {
    color: '#1A1A1A',
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#E0E0E0',
  },
});
