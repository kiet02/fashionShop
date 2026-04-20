/* eslint-disable react-native/no-inline-styles */
import { Alert, View } from 'react-native';
import { AppButton } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { GOOGLE_CLIENT_ID } from '@env';
import { NavigationStackProps } from '../../../navigation/type';
import { useNavigation } from '@react-navigation/core';
import {
  signInWithFacebook,
  signInWithGoogle,
} from '../../../utils/fetchApi/fetch';
import { SIZE } from '../../../utils';
export function LoginOther() {
  const { color } = useAppTheme();
  
  const navigation = useNavigation<NavigationStackProps>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: true,
    });
   
 
  }, []);

  const onLoginGoogle = async () => {

    const res = await signInWithGoogle();
    if (res?.error) {
      Alert.alert('Lỗi', 'Không thể đăng nhập bằng Google');
      return;
    }
    if (res?.success) {
      navigation.navigate('BottomNavigation');
    }
  };

  const onLoginFacebook = async () => {
    const res = await signInWithFacebook();
    if (res?.error) {
      console.error('Lỗi login Facebook:', res.error);
      Alert.alert('Lỗi', 'Không thể đăng nhập bằng Facebook');
      return;
    }

    if (res?.success) {
      navigation.navigate('BottomNavigation');
    }
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
