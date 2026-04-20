/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import { AppButton } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils';
export function LoginOther() {
  const { color } = useAppTheme();
  const onLoginGoogle = async () => {
  };
  const onLoginFacebook = async () => {
  };

  return (
    <View
      style={{
        marginTop: 20,
        width: SIZE.WIDTH_DEVICE(100),
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: color.border,
        paddingTop: 20,
        gap: 20,
      }}
    >
      <AppButton
        title="Login with Google"
        iconLeft={{
          name: 'google',
          type: 'FontAwesome',
          style: { marginRight: 10 },
        }}
        onPress={onLoginGoogle}
        containerStyle={{
          width: SIZE.WIDTH_DP(100) - SIZE.MAR_L * 2,
          backgroundColor: color.base,
        }}
      />
      <AppButton
        title="Login with Facebook"
        iconLeft={{
          name: 'facebook',
          type: 'FontAwesome',
          style: { marginRight: 10 },
        }}
        onPress={onLoginFacebook}
        containerStyle={{
          width: SIZE.WIDTH_DP(100) - SIZE.MAR_L * 2,
          backgroundColor: color.base,
        }}
      />
    </View>
  );
}
