import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  totalItems: number;
  formatCurrency: (value: number) => string;
}

export function CartSummary({
  subtotal,
  discount,
  shippingFee,
  total,
  totalItems,
  formatCurrency,
}: CartSummaryProps) {
  const { color } = useAppTheme();

  return (
    <View
      style={[
        styles.summaryCard,
        { backgroundColor: color.card, borderColor: color.border },
      ]}>
      <AppText
        style={[styles.summaryTitle, { color: color.text }]}
        text="Tóm tắt đơn hàng"
      />

      <View style={styles.summaryRow}>
        <AppText
          style={[styles.summaryLabel, { color: color.textSecondary }]}
          text={`Tạm tính (${totalItems} sản phẩm)`}
        />
        <AppText
          style={[styles.summaryValue, { color: color.text }]}
          text={formatCurrency(subtotal)}
        />
      </View>

      {discount > 0 && (
        <View style={styles.summaryRow}>
          <AppText
            style={[styles.summaryLabel, { color: color.success }]}
            text="Giảm giá"
          />
          <AppText
            style={[styles.summaryValue, { color: color.success }]}
            text={`-${formatCurrency(discount)}`}
          />
        </View>
      )}

      <View style={styles.summaryRow}>
        <AppText
          style={[styles.summaryLabel, { color: color.textSecondary }]}
          text="Phí vận chuyển"
        />
        <AppText
          style={[
            styles.summaryValue,
            { color: shippingFee === 0 ? color.success : color.text },
          ]}
          text={shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}
        />
      </View>

      <View style={[styles.divider, { backgroundColor: color.border }]} />

      <View style={styles.summaryRow}>
        <AppText
          style={[styles.totalLabel, { color: color.text }]}
          text="Tổng cộng"
        />
        <AppText
          style={[styles.totalValue, { color: color.accent }]}
          text={formatCurrency(total)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    borderRadius: 16,
    padding: SIZE.PAD_M,
    borderWidth: 0.5,
    marginTop: SIZE.MAR_S,
  },
  summaryTitle: {
    fontSize: SIZE.TEXT_TITLE_S,
    fontWeight: '700',
    marginBottom: SIZE.MAR_M,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZE.MAR_S,
  },
  summaryLabel: {
    fontSize: SIZE.TEXT_BODY_M,
  },
  summaryValue: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: SIZE.MAR_S,
  },
  totalLabel: {
    fontSize: SIZE.TEXT_BODY_L,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: SIZE.TEXT_TITLE_M,
    fontWeight: '800',
  },
});
