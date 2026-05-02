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
        <ActivityIndicator size="large" color="#002D5E" />
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
        <TouchableOpacity style={styles.cartIconBtn}>
           <AppText style={{ fontSize: 24 }}>🛒</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartBtn}>
          <AppText style={styles.addToCartText}>MUA NGAY</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    gap: 12,
    paddingBottom: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 30,
    gap: 12,
  },
  cartIconBtn: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#002D5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#002D5E',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
