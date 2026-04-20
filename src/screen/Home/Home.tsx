import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { HomeBanner } from './items/HomeBanner';
import { HomeCategories } from './items/HomeCategories';
import { HomeBody } from './items/HomeBody';
import { HomeFooter } from './items/HomeFooter';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchData, QUERY_KEY } from '../../utils/fetchApi/fetch';

export function Home() {
  const { color } = useAppTheme();
  const { data, refetch } = useInfiniteQuery({
    queryKey: [QUERY_KEY.ITEMS],
    queryFn: fetchData,
    initialPageParam: { from: 0, to: 9 },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      const ITEM_PER_PAGE = 10;
      const nextFrom = allPages.length * ITEM_PER_PAGE;
      const nextTo = nextFrom + ITEM_PER_PAGE - 1;

      return { from: nextFrom, to: nextTo };
    },
  });

  const allItems = data?.pages.flatMap(page => page) ?? [];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            refetch();
          }}
        />
      }
      style={[styles.container, { backgroundColor: color.background }]}
    >
      <HomeBanner />
      <HomeCategories />
      <HomeBody data={allItems} />
      <HomeFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
