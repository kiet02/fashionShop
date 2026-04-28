/* eslint-disable react-native/no-inline-styles */
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { KEY_API } from '../../utils/fetchApi/api';
import { fetchProductDetail } from '../../utils/fetchApi';
import { DetailImage } from './items/DetailImage';
import { DetailTitle } from './items/DetailTitle';
import { DetailVariants } from './items/DetailVariants';
import { DetailDescription } from './items/DetailDescription';
import { AppText } from '../../elements';
import { useRoute } from '@react-navigation/native';
import { RouteStackProps } from '../../navigation/type';

export function Detail() {

  const route = useRoute<RouteStackProps<'Detail'>['route']>()

  const { data, isLoading } = useQuery({
    queryKey: [KEY_API.Detail, route.params?.id],
    queryFn: () => fetchProductDetail(route.params?.id),
  });

  if (isLoading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EE4D2D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DetailImage data={data.items ?? []} />
        <DetailTitle data={data} />
        <DetailVariants items={data.items ?? []} />
        <DetailDescription data={data} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartBtn}>
          <AppText style={styles.addToCartText}>Thêm vào giỏ hàng</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: 8,
    paddingBottom: 24,
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 24, // Assuming some bottom safe area padding
  },
  addToCartBtn: {
    backgroundColor: '#EE4D2D',
    height: 48,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
