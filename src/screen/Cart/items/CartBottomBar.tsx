import { View, StyleSheet, } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppButton } from '../../../elements/AppButton';

interface CartBottomBarProps {
  total: number;
  totalItems: number;
  formatCurrency: (value: number) => string;
  onCheckout: () => void;
}

export function CartBottomBar({ total, totalItems, formatCurrency, onCheckout }: CartBottomBarProps) {
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
        title={`Thanh toán (${totalItems})`}
        containerStyle={[styles.checkoutBtn, { backgroundColor: color.base }]}
        titleStyle={styles.checkoutText}
        iconRight={{ type: 'MaterialIcons', name: 'arrow-forward', color: '#FFF', size: 20 }}
        onPress={onCheckout}
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
  checkoutBtn: {
    borderRadius: 14,
    height: 50,
    paddingHorizontal: SIZE.PAD_L,
    gap: SIZE.GAP_S,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: SIZE.TEXT_BODY_L,
    fontWeight: '700',
  },
});
