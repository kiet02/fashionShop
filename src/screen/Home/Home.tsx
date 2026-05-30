import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { HomeBanner } from './items/HomeBanner';
import { HomeCategories } from './items/HomeCategories';
import { HomeBody } from './items/HomeBody';
import { HomeFooter } from './items/HomeFooter';
import { useProducts } from '../../utils/fetchApi';

export function Home() {
  const { color } = useAppTheme();
  const { data, isLoading } = useProducts();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: color.background }]}
    >
      <HomeBanner />
      {/* <HomeCategories /> */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : (
        <HomeBody data={data || []} />
      )}
      <HomeFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
