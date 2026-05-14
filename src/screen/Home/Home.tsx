import { ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { HomeBanner } from './items/HomeBanner';
import { HomeCategories } from './items/HomeCategories';
import { HomeBody } from './items/HomeBody';
import { HomeFooter } from './items/HomeFooter';
import { useProducts } from '../../utils/fetchApi';

export function Home() {
  const { color } = useAppTheme();
  const { data } = useProducts();

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
