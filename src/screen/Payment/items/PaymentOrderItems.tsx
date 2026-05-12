import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppImage } from '../../../elements/AppImage';
import { AppIcon } from '../../../elements/AppIcon';
import { OrderItemType } from '../types';

interface PaymentOrderItemsProps {
  items: OrderItemType[];
  totalItems: number;
  formatCurrency: (value: number) => string;
}

export function PaymentOrderItems({ items, totalItems, formatCurrency }: PaymentOrderItemsProps) {
  const { color } = useAppTheme();

  return (
    <View style={[styles.sectionCard, { backgroundColor: color.card, borderColor: color.border }]}>
      <View style={styles.sectionHeader}>
        <AppIcon
          icon={{ type: 'MaterialIcons', name: 'shopping-bag', color: color.base }}
          size={22}
        />
        <AppText
          style={[styles.sectionTitle, { color: color.text }]}
          text={`Sản phẩm (${totalItems})`}
        />
      </View>

      {items.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.orderItem,
            index > 0 && { borderTopWidth: 0.5, borderTopColor: color.border },
          ]}>
          <View style={styles.orderImageWrapper}>
            <AppImage
              source={{ uri: item.image }}
              style={styles.orderImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.orderInfo}>
            <AppText
              style={[styles.orderBrand, { color: color.base }]}
              text={item.brand}
            />
            <AppText
              style={[styles.orderName, { color: color.text }]}
              text={item.name}
              numberOfLines={1}
            />
            <View style={styles.orderVariants}>
              <AppText
                style={[styles.orderVariant, { color: color.textSecondary }]}
                text={`${item.size} · ${item.color}`}
              />
            </View>
            <View style={styles.orderPriceRow}>
              <AppText
                style={[styles.orderPrice, { color: color.accent }]}
                text={formatCurrency(item.price)}
              />
              <AppText
                style={[styles.orderQty, { color: color.textSecondary }]}
                text={`x${item.quantity}`}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    borderRadius: 16,
    borderWidth: 0.5,
    marginBottom: SIZE.MAR_M,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: SIZE.PAD_S + 4,
    gap: SIZE.GAP_S,
  },
  sectionTitle: {
    fontSize: SIZE.TEXT_BODY_L,
    fontWeight: '700',
    flex: 1,
  },
  orderItem: {
    flexDirection: 'row',
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: SIZE.PAD_S + 4,
  },
  orderImageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
  },
  orderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
    marginLeft: SIZE.MAR_M,
    justifyContent: 'center',
  },
  orderBrand: {
    fontSize: SIZE.TEXT_CAPTION,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  orderName: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '600',
    marginTop: 2,
  },
  orderVariants: {
    flexDirection: 'row',
    marginTop: 2,
  },
  orderVariant: {
    fontSize: SIZE.TEXT_CAPTION,
  },
  orderPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  orderPrice: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '800',
  },
  orderQty: {
    fontSize: SIZE.TEXT_DESC_S,
  },
});
