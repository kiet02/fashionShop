import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import { SearchBodyCard } from './SearchBodyCard';

export function SearchBody() {
  const allItems = [
    {
      id: '1',
      name: 'Áo thun Cotton Basic',
      price: '250.000đ',
      sold: 'Đã bán 1.2k',
      image: 'https://picsum.photos/200',
    },
    {
      id: '2',
      name: 'Quần Jean Slimfit Nam',
      price: '450.000đ',
      sold: 'Đã bán 850',
      image: 'https://picsum.photos/201',
    },
    {
      id: '3',
      name: 'Váy Hoa Nhí Vintage',
      price: '320.000đ',
      sold: 'Đã bán 2.1k',
      image: 'https://picsum.photos/202',
    },
    {
      id: '4',
      name: 'Giày Sneaker Trắng',
      price: '890.000đ',
      sold: 'Đã bán 500',
      image: 'https://picsum.photos/203',
    },
    {
      id: '5',
      name: 'Áo Khoác Bomber Đen',
      price: '550.000đ',
      sold: 'Đã bán 340',
      image: 'https://picsum.photos/204',
    },
    {
      id: '6',
      name: 'Túi Xách Da Công Sở',
      price: '1.200.000đ',
      sold: 'Đã bán 120',
      image: 'https://picsum.photos/205',
    },
    {
      id: '7',
      name: 'Mũ Lưỡi Trai Unisex',
      price: '150.000đ',
      sold: 'Đã bán 3.5k',
      image: 'https://picsum.photos/206',
    },
    {
      id: '8',
      name: 'Thắt Lưng Da Nam',
      price: '290.000đ',
      sold: 'Đã bán 980',
      image: 'https://picsum.photos/207',
    },
    {
      id: '9',
      name: 'Kính Mát Thời Trang',
      price: '210.000đ',
      sold: 'Đã bán 1.1k',
      image: 'https://picsum.photos/208',
    },
    {
      id: '10',
      name: 'Sơ Mi Lụa Cao Cấp',
      price: '680.000đ',
      sold: 'Đã bán 450',
      image: 'https://picsum.photos/209',
    },
  ];

  return (
    <View style={styles.container}>
      <FlashList
        data={allItems}
        renderItem={({ item }) => <SearchBodyCard data={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.containerFlastList}
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
