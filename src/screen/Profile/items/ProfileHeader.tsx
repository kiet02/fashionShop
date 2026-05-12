import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppImage, AppText } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { UserType } from '../../../utils/user/UserContext';
import { SIZE } from '../../../utils/responsive/size';

interface Props {
  user: UserType | null;
}

export function ProfileHeader({ user }: Props) {
  const { color } = useAppTheme();

  if (!user) return null;

  return (
    <View style={[styles.container, { backgroundColor: color.card }]}>
      <View style={styles.avatarWrapper}>
        <AppImage
          source={{ uri: user.avatar || '' }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.info}>
        <AppText style={[styles.name, { color: color.text }]}>{user.name}</AppText>
        <AppText style={[styles.email, { color: color.textSecondary }]}>{user.email}</AppText>
        {user.phoneNumber && (
          <AppText style={[styles.phone, { color: color.textSecondary }]}>{user.phoneNumber}</AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZE.PAD_L,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  info: {
    marginLeft: SIZE.MAR_L,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    marginTop: 2,
  },
  phone: {
    fontSize: 14,
    marginTop: 2,
  },
});
