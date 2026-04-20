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
      title: language.home.footer.shipping.title,
      desc: language.home.footer.shipping.desc,
    },
    {
      id: 2,
      icon: 'verified-user',
      title: language.home.footer.secure.title,
      desc: language.home.footer.secure.desc,
    },
    {
      id: 3,
      icon: 'headset-mic',
      title: language.home.footer.support.title,
      desc: language.home.footer.support.desc,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#f4f6f6' }]}>
      {services.map(item => (
        <View key={item.id} style={styles.item}>
          <AppIcon
            icon={{ type: 'MaterialIcons', name: item.icon as any }}
            size={40}
            color={color.text}
          />
          <AppText
            text={item.title}
            style={[styles.title, { color: color.text }]}
          />
          <AppText
            text={item.desc}
            style={[styles.desc, { color: color.textSecondary }]}
          />
        </View>
      ))}

      {/* Copyright line */}
      <View style={[styles.divider, { backgroundColor: color.border }]} />
      <AppText
        text="© 2024 FASHION SHOP. ALL RIGHTS RESERVED."
        style={styles.copyright}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  copyright: {
    fontSize: 10,
    color: '#999',
    letterSpacing: 1,
  },
});
