import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { AppButton, AppTextInput, AppText, AppIcon } from '../../elements';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useNavigation } from '@react-navigation/native';
import { SIZE } from '../../utils';
import { RegisterTerms } from './items/registerTerms';
import { fetchSignup } from '../../utils/fetchApi';

import { useMutation } from '@tanstack/react-query';

export function Register() {
  const { color } = useAppTheme();
  const navigation = useNavigation<any>();

  const [step, setStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dùng useMutation để quản lý việc đăng ký
  const registerMutation = useMutation({
    mutationFn: (data: any) => {
      const payload = {
        account: {
          email: data.email,
          password: data.password,
        },
        user: {
          name: data.name,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          avatar: '',
        }
      };
      return fetchSignup(payload);
    },
    onSuccess: () => {
      Alert.alert('Thành công', 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    },
    onError: (error: any) => {
      console.error('Signup Error:', error);
      Alert.alert('Lỗi', 'Đăng ký thất bại. Email có thể đã được sử dụng hoặc lỗi hệ thống.');
    }
  });

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm<any>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      gender: 'Nam',
      phoneNumber: '',
    },
    shouldUnregister: false,
  });

  const nextStep = async () => {
    const isStep1Valid = await trigger(['email', 'password', 'confirmPassword']);
    if (isStep1Valid) {
      if (!acceptedTerms) {
        Alert.alert('Thông báo', 'Vui lòng đồng ý với điều khoản sử dụng');
        return;
      }
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const onRegister = () => {
    const formData = getValues();
    console.log('--- SUBMITTING REGISTER ---');
    console.log('Form data from getValues:', formData);

    // Đảm bảo không bị mất email/password từ Step 1
    if (!formData.email || !formData.password) {
      Alert.alert('Lỗi', 'Thông tin đăng nhập bị thiếu. Vui lòng quay lại bước 1.');
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: color.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        {step === 2 && (
          <TouchableOpacity onPress={prevStep} style={styles.backBtn}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'arrow-back' }} size={24} color={color.text} />
          </TouchableOpacity>
        )}
        <AppText
          text={step === 1 ? 'Đăng ký tài khoản' : 'Thông tin cá nhân'}
          style={[styles.title, { color: color.text }]}
        />
      </View>

      <View style={styles.stepIndicator}>
        <View style={[styles.stepDot, { backgroundColor: step >= 1 ? color.base : color.border }]} />
        <View style={[styles.stepLine, { backgroundColor: step >= 2 ? color.base : color.border }]} />
        <View style={[styles.stepDot, { backgroundColor: step >= 2 ? color.base : color.border }]} />
      </View>

      <View style={styles.inner}>
        {/* Step 1 */}
        <View style={{ display: step === 1 ? 'flex' : 'none' }}>
          <AppTextInput
            title="Email"
            isRequired
            control={control}
            name="email"
            placeholder="example@gmail.com"
            iconLeft={{ type: 'MaterialIcons', name: 'email' }}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.fieldSpacing}
            rules={{
              required: 'Vui lòng nhập email',
              pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' }
            }}
          />

          <AppTextInput
            title="Mật khẩu"
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
            rules={{
              required: 'Vui lòng nhập mật khẩu',
              minLength: { value: 6, message: 'Mật khẩu phải từ 6 ký tự' }
            }}
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
            rules={{
              required: 'Vui lòng xác nhận mật khẩu',
              validate: (val: string) => val === getValues('password') || 'Mật khẩu xác nhận không khớp'
            }}
          />

          <RegisterTerms
            acceptedTerms={acceptedTerms}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          />

          <AppButton
            title="Tiếp tục"
            onPress={nextStep}
            containerStyle={styles.mainBtn}
          />
        </View>

        {/* Step 2 */}
        <View style={{ display: step === 2 ? 'flex' : 'none' }}>
          <AppTextInput
            title="Họ và tên"
            isRequired
            control={control}
            name="name"
            placeholder="Nguyễn Văn A"
            iconLeft={{ type: 'MaterialIcons', name: 'person' }}
            containerStyle={styles.fieldSpacing}
            rules={{ required: 'Vui lòng nhập họ tên' }}
          />

          <View style={styles.fieldSpacing}>
            <AppText style={[styles.label, { color: color.textSecondary }]}>Giới tính</AppText>
            <View style={styles.genderRow}>
              {['Nam', 'Nữ', 'Khác'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderItem,
                    {
                      borderColor: watch('gender') === g ? color.base : color.border,
                      backgroundColor: watch('gender') === g ? color.base + '10' : 'transparent'
                    }
                  ]}
                  onPress={() => setValue('gender', g)}
                >
                  <AppText style={{ color: watch('gender') === g ? color.base : color.text }}>{g}</AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <AppTextInput
            title="Số điện thoại"
            isRequired
            control={control}
            name="phoneNumber"
            placeholder="0987654321"
            iconLeft={{ type: 'MaterialIcons', name: 'phone' }}
            keyboardType="phone-pad"
            containerStyle={styles.fieldSpacing}
            rules={{
              required: 'Vui lòng nhập số điện thoại',
              pattern: { value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g, message: 'Số điện thoại không hợp lệ' }
            }}
          />

          <AppButton
            title={"Hoàn tất đăng ký"}
            onPress={handleSubmit(onRegister)}
            disabled={registerMutation.isPending}
            containerStyle={styles.mainBtn}
          />

        </View>

        <View style={styles.loginRow}>
          <AppText style={{ color: color.textSecondary }}>Đã có tài khoản? </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <AppText style={{ color: color.base, fontWeight: 'bold' }}>Đăng nhập ngay</AppText>
          </TouchableOpacity>
        </View>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SIZE.PAD_M,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZE.MAR_L,
  },
  backBtn: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZE.MAR_L,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  inner: {
    width: '100%',
  },
  fieldSpacing: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderItem: {
    flex: 1,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBtn: {
    marginTop: SIZE.MAR_L,
    height: 54,
  },
  loginRow: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'center',
  },
});


