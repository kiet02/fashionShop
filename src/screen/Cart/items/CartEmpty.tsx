import { View, StyleSheet, StatusBar } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppButton } from '../../../elements/AppButton';
import { AppIcon } from '../../../elements/AppIcon';
import { useNavigation } from '@react-navigation/native';
import { NavigationStackProps } from '../../../navigation/type';

export function CartEmpty() {
  const { color } = useAppTheme();
  const navigation = useNavigation<NavigationStackProps>();
  return (
    <View style={[styles.emptyContainer, { backgroundColor: color.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={color.background} />
      <AppIcon
        icon={{ type: 'MaterialIcons', name: 'shopping-cart', color: color.textPlaceholder }}
        size={80}
      />
      <AppText
        style={[styles.emptyTitle, { color: color.text }]}
        text="Giỏ hàng trống"
      />
      <AppText
        style={[styles.emptySubtitle, { color: color.textSecondary }]}
        text="Hãy khám phá và thêm sản phẩm yêu thích vào giỏ hàng nhé!"
      />
      <AppButton
        title="Mua sắm ngay"
        containerStyle={[styles.shopNowBtn, { backgroundColor: color.base }]}
        titleStyle={styles.shopNowText}
        onPress={() => { navigation.navigate('BottomNavigation') }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZE.PAD_L,
  },
  emptyTitle: {
    fontSize: SIZE.TEXT_TITLE_M,
    fontWeight: '700',
    marginTop: SIZE.MAR_M,
  },
  emptySubtitle: {
    fontSize: SIZE.TEXT_BODY_M,
    textAlign: 'center',
    marginTop: SIZE.MAR_S,
    lineHeight: 22,
  },
  shopNowBtn: {
    marginTop: SIZE.MAR_L,
    paddingHorizontal: SIZE.PAD_XL,
    borderRadius: 25,
    height: 48,
  },
  shopNowText: {
    fontSize: SIZE.TEXT_BODY_L,
    fontWeight: '600',
    color: '#FFF',
  },
});
