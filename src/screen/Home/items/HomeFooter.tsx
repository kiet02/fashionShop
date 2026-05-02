/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppIcon, AppText } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';

export function HomeFooter() {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();

  const services = [
    {
      id: 1,
      icon: 'local-shipping',
      title: 'Giao hàng hỏa tốc',
    },
    {
      id: 2,
      icon: 'verified-user',
      title: 'Bảo hành tận nơi',
    },
    {
      id: 3,
      icon: 'headset-mic',
      title: 'Hỗ trợ kỹ thuật 24/7',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#002D5E' }]}>
      <View style={styles.serviceRow}>
        {services.map(item => (
          <View key={item.id} style={styles.serviceItem}>
            <AppIcon
              icon={{ type: 'MaterialIcons', name: item.icon as any }}
              size={24}
              color="#FFFFFF"
            />
            <AppText
              text={item.title}
              style={[styles.serviceTitle, { color: '#FFFFFF' }]}
            />
          </View>
        ))}
      </View>

      <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />

      <View style={styles.infoSection}>
        <AppText
          text="HOÀNG HÀ PC"
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        />
        <AppText
          text="Hotline: 1900 1234"
          style={{ color: '#FFFFFF', fontSize: 14, marginBottom: 5 }}
        />
        <AppText
          text="Địa chỉ: Số 123, Đường Công Nghệ, Hà Nội"
          style={{ color: '#FFFFFF', fontSize: 14, marginBottom: 5 }}
        />
        <AppText
          text="Email: contact@hoanghapc.vn"
          style={{ color: '#FFFFFF', fontSize: 14 }}
        />
      </View>

      <View style={styles.socialRow}>
        <AppIcon
          icon={{ type: 'FontAwesome', name: 'facebook' }}
          size={24}
          color="#FFFFFF"
          containerStyle={styles.socialIcon}
        />
        <AppIcon
          icon={{ type: 'FontAwesome', name: 'youtube' }}
          size={24}
          color="#FFFFFF"
          containerStyle={styles.socialIcon}
        />
        <AppIcon
          icon={{ type: 'FontAwesome', name: 'instagram' }}
          size={24}
          color="#FFFFFF"
          containerStyle={styles.socialIcon}
        />
      </View>

      <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
      <AppText
        text="© 2024 HOANG HA PC. ALL RIGHTS RESERVED."
        style={styles.copyright}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
  },
  serviceTitle: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  socialRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialIcon: {
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 25,
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 20,
  },
  copyright: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
