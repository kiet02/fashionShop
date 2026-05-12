import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppIcon } from '../../../elements/AppIcon';

interface PaymentSummaryProps {
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  formatCurrency: (value: number) => string;
}

export function PaymentSummary({ totalItems, subtotal, shippingFee, total, formatCurrency }: PaymentSummaryProps) {
  const { color } = useAppTheme();

  return (
    <View style={[styles.sectionCard, { backgroundColor: color.card, borderColor: color.border }]}>
      <View style={styles.sectionHeader}>
        <AppIcon
          icon={{ type: 'MaterialIcons', name: 'receipt-long', color: color.base }}
          size={22}
        />
        <AppText
          style={[styles.sectionTitle, { color: color.text }]}
          text="Chi tiết thanh toán"
        />
      </View>

      <View style={[styles.summaryBody, { borderTopColor: color.border }]}>
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
            text="Tổng thanh toán"
          />
          <AppText
            style={[styles.totalValue, { color: color.accent }]}
            text={formatCurrency(total)}
          />
        </View>
      </View>
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
  summaryBody: {
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: SIZE.PAD_S + 4,
    borderTopWidth: 0.5,
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
