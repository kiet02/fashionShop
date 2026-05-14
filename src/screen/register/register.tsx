import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppButton, AppTextInput, AppText } from '../../elements';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../utils/language/useAppLanguage';
import { useNavigation } from '@react-navigation/native';
import { registerSchema, RegisterFormData } from '../../utils/helper/rule';
import { SIZE } from '../../utils';
import { RegisterTerms } from './items/registerTerms';
import { useRegister } from '../../utils/fetchApi';

export function Register() {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();
  const navigation = useNavigation<any>();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema(language)),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: register, isPending } = useRegister();

  const onRegister = (data: RegisterFormData) => {
    register(data, {
      onSuccess: result => {
        console.log('Register successful:', result);
        navigation.navigate('Login');
      },
      onError: error => {
        console.error('Register failed:', error);
      },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: color.primary },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <AppText
        text={language.register.title || 'Đăng ký'}
        style={{
          fontSize: SIZE.TEXT_TITLE_L,
          fontWeight: 'bold',
          marginBottom: 18,
          color: '#FFFFFF',
        }}
      />

      <View style={styles.inner}>
        <AppTextInput
          title="Email"
          isRequired
          control={control}
          name="email"
          placeholder={language.login.emailPlaceholder}
          iconLeft={{ type: 'MaterialIcons', name: 'email' }}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.fieldSpacing}
        />

        <AppTextInput
          title={language.login.passwordPlaceholder}
          isRequired
          control={control}
          name="password"
          placeholder="••••••••"
          iconLeft={{ type: 'MaterialIcons', name: 'lock' }}
          iconRight={{
            type: 'MaterialIcons',
            name: showPassword ? 'visibility' : 'visibility-off',
          }}
          onPressIconRight={() => setShowPassword(!showPassword)}
          secureTextEntry={!showPassword}
          containerStyle={styles.fieldSpacing}
        />

        <AppTextInput
          title="Xác nhận mật khẩu"
          isRequired
          control={control}
          name="confirmPassword"
          placeholder="••••••••"
          iconLeft={{ type: 'MaterialIcons', name: 'lock' }}
          iconRight={{
            type: 'MaterialIcons',
            name: showConfirmPassword ? 'visibility' : 'visibility-off',
          }}
          onPressIconRight={() => setShowConfirmPassword(!showConfirmPassword)}
          secureTextEntry={!showConfirmPassword}
          containerStyle={styles.fieldSpacing}
        />

        <RegisterTerms
          acceptedTerms={acceptedTerms}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        />

        <AppButton
          title={language.register.registerButton}
          onPress={handleSubmit(onRegister)}
          disabled={!isValid || !acceptedTerms || isSubmitting || isPending}
          containerStyle={{
            width: SIZE.WIDTH_DP(100) - SIZE.MAR_L * 2,
            backgroundColor:
              !isValid || !acceptedTerms ? '#CCCCCC' : '#FFFFFF',
          }}
          titleStyle={{
            color: color.primary,
            fontWeight: 'bold',
          }}
        />

        <View style={styles.loginRow}>
          <Text style={{ color: '#FFFFFF' }}>
            {language.register.alreadyHaveAccount || 'Đã có tài khoản? '}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textDecorationLine: 'underline' }}>
              {language.register.loginNow || 'Đăng nhập'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
  },
  fieldSpacing: {
    marginBottom: 20,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  termsText: {
    fontSize: 13,
    flex: 1,
  },
  loginRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    gap: 6,
  },
});
