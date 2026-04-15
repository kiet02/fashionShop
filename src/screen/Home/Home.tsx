import { ScrollView } from 'react-native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { HomeBanner } from './items/HomeBanner';
import { HomeCategories } from './items/HomeCategories';
import { HomeBody } from './items/HomeBody';
import { HomeFooter } from './items/HomeFooter';

export function Home() {
  const { color } = useAppTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: color.background }}>
      <HomeBanner />
      <HomeCategories />
      <HomeBody />
      <HomeFooter />
    </ScrollView>
  );
}
