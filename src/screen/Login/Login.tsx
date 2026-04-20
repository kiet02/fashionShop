/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import { AppImage } from '../../elements/AppImage';
import { logo, SIZE } from '../../utils';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { LoginOther } from './items/LoginFooter';
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
        backgroundColor: color.background,
      }}
    >
      <AppImage
        source={logo}
        style={{
          width: 500,
          height: 150,
          resizeMode: 'contain',
        }}
      />
      <LoginBody />
      <LoginOther />
    </View>
  );
}
