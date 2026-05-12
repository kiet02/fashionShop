import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppIcon } from '../../../elements/AppIcon';
import { PaymentMethodType } from '../types';

interface PaymentMethodsProps {
  methods: PaymentMethodType[];
  selectedPayment: string;
  onSelectPayment: (id: string) => void;
}

export function PaymentMethods({ methods, selectedPayment, onSelectPayment }: PaymentMethodsProps) {
  const { color } = useAppTheme();

  return (
    <View style={[styles.sectionCard, { backgroundColor: color.card, borderColor: color.border }]}>
      <View style={styles.sectionHeader}>
        <AppIcon
          icon={{ type: 'MaterialIcons', name: 'payment', color: color.base }}
          size={22}
        />
        <AppText
          style={[styles.sectionTitle, { color: color.text }]}
          text="Phương thức thanh toán"
        />
      </View>

      {methods.map((method, index) => {
        const isSelected = selectedPayment === method.id;
        return (
          <TouchableOpacity
            key={method.id}
            activeOpacity={0.7}
            onPress={() => onSelectPayment(method.id)}
            style={[
              styles.paymentOption,
              index > 0 && { borderTopWidth: 0.5, borderTopColor: color.border },
            ]}>
            <AppIcon
              icon={{ type: 'MaterialIcons', name: method.icon as any, color: isSelected ? color.base : color.textSecondary }}
              size={24}
            />
            <View style={styles.paymentInfo}>
              <AppText
                style={[styles.paymentLabel, { color: color.text }]}
                text={method.label}
              />
              <AppText
                style={[styles.paymentDesc, { color: color.textSecondary }]}
                text={method.desc}
              />
            </View>
            <View
              style={[
                styles.radioOuter,
                { borderColor: isSelected ? color.base : color.border },
              ]}>
              {isSelected && (
                <View style={[styles.radioInner, { backgroundColor: color.base }]} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
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
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZE.PAD_M,
    paddingVertical: SIZE.PAD_S + 6,
    gap: SIZE.GAP_M,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: SIZE.TEXT_BODY_M,
    fontWeight: '600',
  },
  paymentDesc: {
    fontSize: SIZE.TEXT_CAPTION,
    marginTop: 1,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
