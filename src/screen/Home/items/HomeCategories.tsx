/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AppText, AppIcon } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';

const categories = [
  { id: '1', name: 'Laptop', icon: 'laptop' },
  { id: '2', name: 'Build PC', icon: 'settings-input-component' },
  { id: '3', name: 'Linh kiện', icon: 'memory' },
  { id: '4', name: 'Màn hình', icon: 'monitor' },
  { id: '5', name: 'Chuột/Phím', icon: 'mouse' },
  { id: '6', name: 'Gaming Gear', icon: 'videogame-asset' },
];

export function HomeCategories() {
  const { color } = useAppTheme();

  return (
    <View style={{ marginVertical: 20 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {categories.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryItem}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: color.card }]}>
              <AppIcon
                icon={{ type: 'MaterialIcons', name: item.icon as any }}
                color={color.base}
                size={28}
              />
            </View>
            <AppText
              text={item.name}
              style={{ fontSize: 12, color: color.text, marginTop: 8 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow cho vòng tròn
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
