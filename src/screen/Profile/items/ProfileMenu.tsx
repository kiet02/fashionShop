import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AppIcon, AppText } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { useUser } from '../../../utils/user/UserContext';
import { useNavigation } from '@react-navigation/native';

interface Props {
  orders: any[];
}

export function ProfileMenu({ orders }: Props) {
  const { color } = useAppTheme();
  const { logout } = useUser();
  const navigation = useNavigation<any>();

  const menuItems = [
    { id: '1', title: 'Thông tin cá nhân', icon: 'person', type: 'MaterialIcons', onPress: () => navigation.navigate('UserInfo') },
    { id: '2', title: 'Địa chỉ của tôi', icon: 'location-on', type: 'MaterialIcons', onPress: () => navigation.navigate('Address') },
    { id: '3', title: 'Đơn hàng của tôi', icon: 'shopping-bag', type: 'MaterialIcons', count: orders.length, onPress: () => navigation.navigate('OrderHistory') },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Đăng xuất', 
          style: 'destructive',
          onPress: () => {
            logout();
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {menuItems.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[styles.menuItem, { borderBottomColor: color.border }]}
          activeOpacity={0.7}
          onPress={item.onPress}
        >
          <View style={[styles.iconWrapper, { backgroundColor: color.card }]}>
            <AppIcon
              icon={{ type: item.type as any, name: item.icon as any }}
              color={color.base}
              size={22}
            />
          </View>
          <AppText style={[styles.menuTitle, { color: color.text }]}>{item.title}</AppText>
          {item.count !== undefined && item.count > 0 && (
            <View style={[styles.badge, { backgroundColor: color.accent }]}>
              <AppText style={styles.badgeText}>{item.count}</AppText>
            </View>
          )}
          <AppIcon
            icon={{ type: 'MaterialIcons', name: 'chevron-right' }}
            color={color.textSecondary}
            size={24}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.logoutBtn, { borderColor: color.error }]}
        onPress={handleLogout}
      >
        <AppIcon icon={{ type: 'MaterialIcons', name: 'logout' }} color={color.error} size={22} />
        <AppText style={[styles.logoutText, { color: color.error }]}>Đăng xuất</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZE.PAD_M,
    marginTop: SIZE.MAR_M,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZE.PAD_M,
    borderBottomWidth: 0.5,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    flex: 1,
    marginLeft: SIZE.MAR_M,
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  badge: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZE.MAR_L,
    paddingVertical: SIZE.PAD_M,
    borderWidth: 1,
    borderRadius: 12,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
