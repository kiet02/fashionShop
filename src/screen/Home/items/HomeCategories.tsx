/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AppText, AppIcon } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/type';

const categories = [
  { id: '1', name: 'Áo nam', params: { category: 'clothing', gender: 'male' }, icon: 'checkroom' },
  { id: '2', name: 'Váy nữ', params: { category: 'clothing', gender: 'female' }, icon: 'accessibility' },
  { id: '3', name: 'Giày dép', params: { category: 'shoes' }, icon: 'ice-skating' },
  { id: '4', name: 'Phụ kiện', params: { category: 'accessories' }, icon: 'watch' },
];

export function HomeCategories() {
  const { color } = useAppTheme();
  const navigation = useNavigation<RootStackParamList['Search']>();

  const handlePress = (params: any) => {
    navigation.navigate('Search', params);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <AppText
          text="Danh mục"
          style={{ fontSize: 16, fontWeight: '700', color: color.text }}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 4 }}
      >
        {categories.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryItem}
            activeOpacity={0.7}
            onPress={() => handlePress(item.params)}
          >
            <View style={[styles.iconCircle, { backgroundColor: color.card }]}>
              <AppIcon
                icon={{ type: 'MaterialIcons', name: item.icon as any }}
                color={color.base}
                size={26}
              />
            </View>
            <AppText
              text={item.name}
              style={{
                fontSize: 12,
                color: color.textSecondary,
                marginTop: 8,
                fontWeight: '500',
              }}
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
