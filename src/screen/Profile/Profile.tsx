import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AppText, AppIcon, AppImage } from '../../elements';
import { useNavigation } from '@react-navigation/native';
import { NavigationStackProps } from '../../navigation/type';
import { storage } from '../../utils/mmkv/mmkv';

export function Profile() {
  const navigation = useNavigation<NavigationStackProps>();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const userStr = storage.getString('userInfo');
    if (userStr) {
      try {
        setUserInfo(JSON.parse(userStr));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đồng ý',
        style: 'destructive',
        onPress: () => {
          navigation.navigate('Login');
        }
      },
    ]);
  };

  const displayName = userInfo?.name || userInfo?.username || 'Guest';
  const displayEmail = userInfo?.email || 'No email provided';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header - Avatar & Name */}
        <View style={styles.headerContainer}>
          <View style={styles.avatarWrapper}>
            <AppImage
              source={{ uri: userInfo?.avatar || 'https://i.pravatar.cc/150?img=11' }}
              style={styles.avatar}
            />
            <View style={styles.cameraIcon}>
              <AppIcon icon={{ type: 'MaterialIcons', name: 'camera-alt' }} size={16} color="#fff" />
            </View>
          </View>
          <AppText style={styles.userName}>{displayName}</AppText>
          <AppText style={styles.userEmail}>{displayEmail}</AppText>
        </View>

        {/* Logout */}
        <View style={[styles.sectionContainer, { marginTop: 24 }]}>
          <ProfileOption
            icon="logout"
            title="Đăng xuất"
            onPress={handleLogout}
            color="#EF4444"
            hideChevron
            textStyle={{ color: '#EF4444' }}
          />
        </View>

      </ScrollView>
    </View>
  );
}

function ProfileOption({
  icon,
  title,
  onPress,
  color,
  hideChevron = false,
  textStyle = {}
}: {
  icon: string,
  title: string,
  onPress: () => void,
  color: string,
  hideChevron?: boolean,
  textStyle?: any
}) {
  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconWrapper, { backgroundColor: color + '20' }]}>
        <AppIcon icon={{ type: 'MaterialIcons', name: icon as any }} size={24} color={color} />
      </View>
      <AppText style={[styles.optionTitle, textStyle]}>{title}</AppText>
      {!hideChevron && (
        <AppIcon icon={{ type: 'MaterialIcons', name: 'chevron-right' }} size={24} color="#999" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#0084FF',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0084FF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 72,
    marginRight: 16,
  },
});
