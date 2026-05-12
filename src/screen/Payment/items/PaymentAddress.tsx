import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppIcon } from '../../../elements/AppIcon';
import { ShippingAddressType } from '../types';
import { useNavigation } from '@react-navigation/native';

interface PaymentAddressProps {
  address: ShippingAddressType;
  error?: string;
}

export function PaymentAddress({ address, error }: PaymentAddressProps) {
  const { color } = useAppTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.sectionCard, { backgroundColor: color.card, borderColor: color.border }]}>
      <View style={styles.sectionHeader}>
        <AppIcon
          icon={{ type: 'MaterialIcons', name: 'location-on', color: color.base }}
          size={22}
        />
        <AppText
          style={[styles.sectionTitle, { color: color.text }]}
          text="Địa chỉ nhận hàng"
        />
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.editBtn}
          onPress={() => navigation.navigate('Address')}
        >
          <AppText
            style={[styles.editText, { color: color.base }]}
            text={address.address === 'Chưa có địa chỉ' ? "Thêm địa chỉ" : "Thay đổi"}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.addressContent, { borderTopColor: color.border }]}>
        <View style={styles.addressRow}>
          <AppText
            style={[styles.addressName, { color: color.text }]}
            text={address.name}
          />
          <View style={[styles.addressDividerDot, { backgroundColor: color.border }]} />
          <AppText
            style={[styles.addressPhone, { color: color.text }]}
            text={address.phone}
          />
        </View>
        <AppText
          style={[styles.addressDetail, { color: color.textSecondary }]}
          text={address.address}
          numberOfLines={2}
        />
      </View>
      {error && (
        <View style={[styles.errorContainer, { backgroundColor: color.error + '10' }]}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'error-outline' }} size={16} color={color.error} />
          <AppText style={[styles.errorText, { color: color.error }]} text={error} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    borderRadius: 16,
    borderWidth: 0.5,
    marginBottom: SIZE.MAR_M,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: SIZE.PAD_S + 4,
    gap: SIZE.GAP_S,
  },
  sectionTitle: {
    fontSize: SIZE.TEXT_BODY_L,
    fontWeight: '700',
    flex: 1,
  },
  editBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editText: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '600',
  },
  addressContent: {
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: SIZE.PAD_S + 4,
    borderTopWidth: 0.5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressName: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '700',
  },
  addressDividerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: SIZE.MAR_S,
  },
  addressPhone: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '500',
  },
  addressDetail: {
    fontSize: SIZE.TEXT_DESC_S,
    lineHeight: 18,
    marginTop: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: 8,
    gap: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 0, 0, 0.1)',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
