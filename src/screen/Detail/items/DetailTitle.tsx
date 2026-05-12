import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductDetail } from '../../../utils/fetchApi/type';
import { AppText } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';

export function DetailTitle({ data }: { data: ProductDetail }) {
  const { color } = useAppTheme();
  const { productName, price, sale, sold, rating } = data;

  const hasDiscount = sale > 0;
  const discountedPrice = hasDiscount ? price * (1 - sale / 100) : price;

  const brand = data.categories?.find(c => c.type === 'brand')?.name ?? '';

  return (
    <View style={[styles.container, { backgroundColor: color.card }]}>
      {/* GIÁ */}
      <View style={styles.priceRow}>
        <AppText style={[styles.price, { color: color.base }]}>
          {formatCurrency(discountedPrice)}
        </AppText>
        {hasDiscount && (
          <>
            <AppText style={[styles.originalPrice, { color: color.textSecondary }]}>
              {formatCurrency(price)}
            </AppText>
            <View style={[styles.discountBadge, { backgroundColor: color.base + '10', borderColor: color.base }]}>
              <AppText style={[styles.discountText, { color: color.base }]}>-{sale}%</AppText>
            </View>
          </>
        )}
      </View>

      {/* TÊN SẢN PHẨM */}
      <AppText style={[styles.name, { color: color.text }]} numberOfLines={3}>
        {productName}
      </AppText>

      {/* BRAND */}
      {!!brand && (
        <View style={styles.brandRow}>
          <AppText style={[styles.brandLabel, { color: color.textSecondary }]}>Thương hiệu: </AppText>
          <AppText style={[styles.brandValue, { color: color.text }]}>{brand.toUpperCase()}</AppText>
        </View>
      )}

      {/* RATING + ĐÃ BÁN */}
      <View style={styles.metaRow}>
        <View style={styles.ratingWrapper}>
          <AppText style={[styles.ratingValue, { color: color.base }]}>{rating.toFixed(1)}</AppText>
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

        <View style={[styles.divider, { backgroundColor: color.border }]} />

        <AppText style={[styles.metaText, { color: color.textSecondary }]}>
          Đã bán <AppText style={[styles.metaHighlight, { color: color.text }]}>{formatCount(sold)}</AppText>
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
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
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
