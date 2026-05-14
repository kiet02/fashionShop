import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, AppIcon } from '../../../elements';

export function DetailPolicies() {
  return (
    <View style={styles.container}>

      {/* Showrooms */}
      <View style={styles.card}>
        <View style={styles.header}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'storefront' }} size={18} color="#fff" />
          <AppText style={styles.headerTitle}>Sản phẩm còn hàng tại</AppText>
        </View>
        <View style={styles.body}>
          <AppText style={styles.areaTitle}>Showroom Miền Bắc:</AppText>
          <AppText style={styles.addressText}>- 41 Khúc Thừa Dụ, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội</AppText>
          <AppText style={styles.addressText}>- 94E-94F Đường Láng, Phường Ngã Tư Sở, Quận Đống Đa, Hà Nội</AppText>

          <AppText style={[styles.areaTitle, { marginTop: 8 }]}>Showroom Miền Nam:</AppText>
          <AppText style={styles.addressText}>- 260 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh</AppText>
        </View>
      </View>

      {/* Policies */}
      <View style={styles.card}>
        <View style={styles.header}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'verified-user' }} size={18} color="#fff" />
          <AppText style={styles.headerTitle}>Yên Tâm Mua Sắm Tại HoangHaPC</AppText>
        </View>
        <View style={styles.body}>
          <PolicyItem icon="engineering" text="Đội ngũ kỹ thuật tư vấn chuyên sâu" />
          <PolicyItem icon="payment" text="Thanh toán thuận tiện" />
          <PolicyItem icon="verified" text="Sản phẩm 100% chính hãng" />
          <PolicyItem icon="published-with-changes" text="Bảo hành 1 đổi 1 tại nơi sử dụng" />
          <PolicyItem icon="price-check" text="Giá cạnh tranh nhất thị trường" />
        </View>
      </View>

      {/* Hotline */}
      <View style={styles.card}>
        <View style={styles.header}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'headset-mic' }} size={18} color="#fff" />
          <AppText style={styles.headerTitle}>Liên Hệ Với Kinh Doanh Online</AppText>
        </View>
        <View style={styles.body}>
          <AppText style={styles.addressText}>Hotline Hà Nội: <AppText style={styles.phoneText}>0969.123.666</AppText></AppText>
          <AppText style={styles.addressText}>Hotline HCM: <AppText style={styles.phoneText}>0968.123.666</AppText></AppText>
          <AppText style={styles.addressText}>Hotline Bảo Hành: <AppText style={styles.phoneText}>1900.6100</AppText></AppText>
        </View>
      </View>

    </View>
  );
}

function PolicyItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.policyItem}>
      <AppIcon icon={{ type: 'MaterialIcons', name: icon as any }} size={16} color="#0084FF" />
      <AppText style={styles.policyText}>{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 6,
    borderBottomColor: '#F0F4F8',
    gap: 16,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#0084FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  body: {
    padding: 12,
  },
  areaTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 4,
  },
  phoneText: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  policyText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
});
