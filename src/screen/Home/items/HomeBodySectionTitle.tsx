import { TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { AppText } from '../../../elements';

export function HomeBodySectionTitle({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  const { color } = useAppTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <AppText
        text={title}
        style={{ fontSize: 18, fontWeight: 'bold', color: color.text }}
      />
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <AppText
            text="Xem tất cả"
            style={{ color: color.primary, fontSize: 14 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
