import { View } from 'react-native';
import { AppText } from '../../elements/AppText';
import { SIZE } from '../../utils';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { LoginBody } from './items/LoginBody';

export function Login() {
  const { color } = useAppTheme();

  return (
    <View
      style={{
        width: SIZE.WIDTH_DEVICE(100),
        height: SIZE.HEIGHT_DEVICE(100),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
      }}
    >
      <AppText
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: 40,
        }}
      >
        Hoàng Hà PC
      </AppText>
      <LoginBody />
    </View>
  );
}
