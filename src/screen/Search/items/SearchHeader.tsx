import { View } from 'react-native';
import { AppButton, AppTextInput } from '../../../elements';
import { SIZE } from '../../../utils';
import { useAppTheme } from '../../../utils/theme/useAppTheme';

export function SearchHeader({ control }: { control: any }) {
  const { color } = useAppTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: SIZE.MAR_M,
        gap: SIZE.GAP_M,
      }}
    >
      <AppTextInput
        iconLeft={{ type: 'MaterialIcons', name: 'search' }}
        control={control}
        name="search"
        placeholder="Search..."
        containerStyle={{ flex: 1 }}
      />
      <AppButton
        iconLeft={{ type: 'MaterialIcons', name: 'filter-alt' }}
        containerStyle={{ backgroundColor: color.base }}
      />
    </View>
  );
}
