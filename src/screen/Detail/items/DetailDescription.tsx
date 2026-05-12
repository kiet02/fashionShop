import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { AppText } from '../../../elements';
import { ProductDetail } from '../../../utils/fetchApi/type';

export function DetailDescription({ data }: { data: ProductDetail }) {
  const { color } = useAppTheme();
  if (!data.description) return null;

  return (
    <View style={[styles.container, { backgroundColor: color.card }]}>
      <AppText style={[styles.title, { color: color.text }]}>Mô tả sản phẩm</AppText>
      <AppText style={[styles.content, { color: color.textSecondary }]}>
        {data.description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
  },
});
