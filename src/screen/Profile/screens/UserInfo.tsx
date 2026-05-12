import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppIcon } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { useUser } from '../../../utils/user/UserContext';
import { SIZE } from '../../../utils/responsive/size';
import { fetchUpdateAccount } from '../../../utils/fetchApi';
import { useNavigation } from '@react-navigation/native';

export function UserInfo() {
  const { color } = useAppTheme();
  const { user, setUser } = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    if (!name.trim() || !phoneNumber.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        ...user,
        name,
        phoneNumber,
      };
      await fetchUpdateAccount(updateData);
      setUser(updateData);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Cập nhật thông tin thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'arrow-back' }} size={24} color={color.text} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Thông tin cá nhân</AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <AppText style={[styles.label, { color: color.textSecondary }]}>Họ và tên</AppText>
          <TextInput
            style={[styles.input, { color: color.text, borderColor: color.border }]}
            value={name}
            onChangeText={setName}
            placeholder="Nhập họ và tên"
            placeholderTextColor={color.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <AppText style={[styles.label, { color: color.textSecondary }]}>Số điện thoại</AppText>
          <TextInput
            style={[styles.input, { color: color.text, borderColor: color.border }]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            placeholderTextColor={color.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <AppText style={[styles.label, { color: color.textSecondary }]}>Email</AppText>
          <TextInput
            style={[styles.input, { color: color.textSecondary, borderColor: color.border, backgroundColor: color.card }]}
            value={user?.email}
            editable={false}
          />
          <AppText style={styles.hint}>Email không thể thay đổi</AppText>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: color.base }]}
          onPress={handleSave}
          disabled={loading}
        >
          <AppText style={styles.saveButtonText}>{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.PAD_M,
    height: 56,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: SIZE.PAD_M,
  },
  inputGroup: {
    marginBottom: SIZE.MAR_L,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: SIZE.PAD_M,
    fontSize: 16,
  },
  hint: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  saveButton: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZE.MAR_XL,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
