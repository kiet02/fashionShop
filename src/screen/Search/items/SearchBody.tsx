// SearchBody.tsx
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SearchBodyCard } from './SearchBodyCard';
import { useQuery } from '@tanstack/react-query';
import { KEY_API } from '../../../utils/fetchApi/api';
import { fetchProductsWithFilter } from '../../../utils/fetchApi';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from '../modules/useDebounce';
import { AppText } from '../../../elements';

export function SearchBody({ params }: { params: any }) {
  const { watch } = useFormContext();

  const searchKeyword = watch('search');
  const debouncedSearch = useDebounce(searchKeyword, 500);

  const { data, isLoading } = useQuery({
    queryKey: [KEY_API.search, debouncedSearch, params],
    queryFn: () =>
      fetchProductsWithFilter(
        {
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          ...params.filter,
        },
        debouncedSearch,
      ),
    enabled: true,
  });

  if (isLoading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <FlashList
        data={data || []} // Đảm bảo data luôn là mảng, tránh lỗi khi data là undefined
        renderItem={({ item }) => <SearchBodyCard data={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.containerFlastList}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <AppText text="Không tìm thấy sản phẩm" />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 500,
  },
  containerFlastList: {
    paddingHorizontal: 16,
  },
  itemSeparator: {
    height: 16,
  },
});
