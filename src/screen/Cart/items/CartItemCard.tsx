import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppImage } from '../../../elements/AppImage';
import { AppButton } from '../../../elements/AppButton';
import { AppIcon } from '../../../elements/AppIcon';
import { CartItemType } from '../types';


interface CartItemCardProps {
  item: CartItemType;
  formatCurrency: (value: number) => string;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({
  item,
  formatCurrency,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const { color } = useAppTheme();

  return (
    <View
      style={[
        styles.cartCard,
        { backgroundColor: color.card, borderColor: color.border },
      ]}>
      {/* Product Image */}
      <View style={styles.imageWrapper}>
        <AppImage
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {item.originalPrice && (
          <View style={[styles.saleBadge, { backgroundColor: color.accent }]}>
            <AppText style={[styles.saleText, { color: color.background }]} text="SALE" />
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.infoSection}>
        <View style={styles.topRow}>
          <AppText
            style={[styles.brandLabel, { color: color.base }]}
            text={item.brand}
          />
          <AppIcon
            icon={{ type: 'MaterialIcons', name: 'close', color: color.textSecondary }}
            size={20}
            onPress={() => onRemove(item.id)}
          />
        </View>

        <AppText
          style={[styles.productName, { color: color.text }]}
          text={item.name}
          numberOfLines={2}
        />

        <View style={styles.variantRow}>
          <View style={[styles.variantChip, { backgroundColor: color.background }]}>
            <AppText
              style={[styles.variantText, { color: color.textSecondary }]}
              text={`Size: ${item.size}`}
            />
          </View>
          <View style={[styles.variantChip, { backgroundColor: color.background }]}>
            <AppText
              style={[styles.variantText, { color: color.textSecondary }]}
              text={item.color}
            />
          </View>
        </View>

        <View style={styles.priceQuantityRow}>
          {/* Price */}
          <View>
            <AppText
              style={[styles.price, { color: color.accent }]}
              text={formatCurrency(item.price)}
            />
            {item.originalPrice && (
              <AppText
                style={[styles.originalPrice, { color: color.textSecondary }]}
                text={formatCurrency(item.originalPrice)}
              />
            )}
          </View>

          {/* Quantity Stepper */}
          <View style={[styles.stepper, { borderColor: color.border }]}>
            <AppButton
              containerStyle={[styles.stepperBtn, { backgroundColor: color.background }]}
              onPress={() => onUpdateQuantity(item.id, -1)}>
              <AppIcon
                icon={{ type: 'MaterialIcons', name: 'remove', color: color.text }}
                size={18}
              />
            </AppButton>
            <AppText
              style={[styles.qtyText, { color: color.text }]}
              text={`${item.quantity}`}
            />
            <AppButton
              containerStyle={[styles.stepperBtn, { backgroundColor: color.base }]}
              onPress={() => onUpdateQuantity(item.id, 1)}>
              <AppIcon
                icon={{ type: 'MaterialIcons', name: 'add' }}
                size={18}
                iconStyle={{ color: 'white' }}
              />
            </AppButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: SIZE.MAR_M,
    padding: SIZE.PAD_S + 4,
    borderWidth: 0.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imageWrapper: {
    width: 110,
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  saleBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  saleText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  infoSection: {
    flex: 1,
    marginLeft: SIZE.MAR_M,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandLabel: {
    fontSize: SIZE.TEXT_DESC_S,
    fontWeight: '700',
    letterSpacing: 1,
  },
  productName: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '600',
    marginTop: 2,
  },
  variantRow: {
    flexDirection: 'row',
    gap: SIZE.GAP_S,
    marginTop: 4,
  },
  variantChip: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  variantText: {
    fontSize: SIZE.TEXT_CAPTION,
  },
  priceQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  price: {
    fontSize: SIZE.TEXT_BODY_L,
    fontWeight: '800',
  },
  originalPrice: {
    fontSize: SIZE.TEXT_DESC_S,
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '700',
    minWidth: 30,
    textAlign: 'center',
  },
});
