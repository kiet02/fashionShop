import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SIZE } from '../../../utils/responsive/size';
import { AppText } from '../../../elements/AppText';
import { AppIcon } from '../../../elements/AppIcon';
import { useNavigation } from '@react-navigation/native';

export function PaymentHeader() {
  const { color } = useAppTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { borderBottomColor: color.border }]}>
      <AppIcon
        icon={{ type: 'MaterialIcons', name: 'arrow-back', color: color.text }}
        size={24}
        onPress={() => navigation.goBack()}
      />
      <AppText style={[styles.headerTitle, { color: color.text }]}>
        Thanh toán
      </AppText>
      <View style={{ width: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.PAD_M,
    paddingTop: SIZE.PAD_L,
    paddingBottom: SIZE.PAD_M,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: SIZE.TEXT_TITLE_M,
    fontWeight: '700',
  },
});
