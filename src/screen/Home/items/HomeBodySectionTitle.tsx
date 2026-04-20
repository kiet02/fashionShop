/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { AppText } from '../../../elements';
import { SIZE } from '../../../utils';

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
        paddingHorizontal: SIZE.PAD_M,
        marginTop: SIZE.MAR_S,
        marginBottom: SIZE.MAR_S,
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
