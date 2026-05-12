import { View, StyleSheet } from 'react-native';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppIcon } from '../../../elements/AppIcon';

interface CartShippingBannerProps {
  subtotal: number;
  formatCurrency: (value: number) => string;
}

import { useAppTheme } from '../../../utils/theme/useAppTheme';

const FREE_SHIPPING_THRESHOLD = 1000000;

export function CartShippingBanner({ subtotal, formatCurrency }: CartShippingBannerProps) {
  const { color } = useAppTheme();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <View
      style={[
        styles.shippingBanner,
        { backgroundColor: isFreeShipping ? color.success + '1A' : color.warning + '1A' },
      ]}>
      <AppIcon
        icon={{
          type: 'MaterialIcons',
          name: 'local-shipping',
          color: isFreeShipping ? color.success : color.warning,
        }}
        size={20}
      />
      <AppText
        style={[
          styles.shippingText,
          { color: isFreeShipping ? color.success : color.warning },
        ]}
        text={
          isFreeShipping
            ? 'Bạn được miễn phí vận chuyển!'
            : `Mua thêm ${formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} để được miễn phí ship`
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shippingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZE.PAD_S,
    paddingHorizontal: SIZE.PAD_M,
    gap: SIZE.GAP_S,
  },
  shippingText: {
    fontSize: SIZE.TEXT_DESC_S,
    fontWeight: '500',
    flex: 1,
  },
});
