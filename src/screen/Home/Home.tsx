import { ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { HomeBanner } from './items/HomeBanner';
import { HomeCategories } from './items/HomeCategories';
import { HomeBody } from './items/HomeBody';
import { HomeFooter } from './items/HomeFooter';
import { useQuery } from '@tanstack/react-query';
import { KEY_API } from '../../utils/fetchApi/api';
import { fetchProductsHot } from '../../utils/fetchApi';

export function Home() {
  const { color } = useAppTheme();
  const { data } = useQuery({
    queryKey: [KEY_API.Hot],
    queryFn: fetchProductsHot,
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: color.background }]}
    >
      <HomeBanner />
      <HomeCategories />
      <HomeBody data={data || []} />
      <HomeFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
