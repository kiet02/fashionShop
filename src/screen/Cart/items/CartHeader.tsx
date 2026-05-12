import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';

interface CartHeaderProps {
  totalItems: number;
}

export function CartHeader({ totalItems }: CartHeaderProps) {
  const { color } = useAppTheme();

  return (
    <View style={[styles.header, { borderBottomColor: color.border }]}>
      <AppText style={[styles.headerTitle, { color: color.text }]}>
        Giỏ hàng
      </AppText>
      <View style={[styles.badge, { backgroundColor: color.accent }]}>
        <AppText style={[styles.badgeText, { color: color.background }]} text={`${totalItems}`} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZE.PAD_M,
    paddingTop: SIZE.PAD_L,
    paddingBottom: SIZE.PAD_M,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: SIZE.TEXT_TITLE_L,
    fontWeight: '800',
  },
  badge: {
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZE.MAR_S,
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: SIZE.TEXT_DESC_S,
    fontWeight: '700',
  },
});
