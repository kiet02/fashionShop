import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppButton } from '../../../elements/AppButton';

interface PaymentBottomBarProps {
  total: number;
  formatCurrency: (value: number) => string;
  onPlaceOrder: () => void;
}

export function PaymentBottomBar({ total, formatCurrency, onPlaceOrder }: PaymentBottomBarProps) {
  const { color } = useAppTheme();

  return (
    <View
      style={[
        styles.bottomBar,
        { backgroundColor: color.background, borderTopColor: color.border },
      ]}>
      <View style={styles.bottomInfo}>
        <AppText
          style={[styles.bottomLabel, { color: color.textSecondary }]}
          text="Tổng thanh toán"
        />
        <AppText
          style={[styles.bottomTotal, { color: color.accent }]}
          text={formatCurrency(total)}
        />
      </View>
      <AppButton
        title="Đặt hàng"
        containerStyle={[styles.placeOrderBtn, { backgroundColor: color.base }]}
        titleStyle={styles.placeOrderText}
        iconRight={{ type: 'MaterialIcons', name: 'check-circle', color: color.background, size: 20 }}
        onPress={onPlaceOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: SIZE.PAD_S + 4,
    paddingBottom: SIZE.PAD_L,
    borderTopWidth: 0.5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  bottomInfo: {
    flex: 1,
  },
  bottomLabel: {
    fontSize: SIZE.TEXT_DESC_S,
  },
  bottomTotal: {
    fontSize: SIZE.TEXT_TITLE_M,
    fontWeight: '800',
    marginTop: 2,
  },
  placeOrderBtn: {
    borderRadius: 14,
    height: 50,
    paddingHorizontal: SIZE.PAD_L,
    gap: SIZE.GAP_S,
  },
  placeOrderText: {
    fontSize: SIZE.TEXT_BODY_L,
    fontWeight: '700',
  },
});
