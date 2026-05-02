import React from 'react';
import { Modal, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { AppButton, AppIcon } from '../../../elements';
import { SIZE } from '../../../utils';
import { SearchFilterItem } from './SearchFilterItem';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { useFormContext } from 'react-hook-form'; // <-- Thêm dòng này

export function SearchFilter({
  visible,
  onClose,
  control,
  onApply,
  currentParams,
}: any) {
  const { color } = useAppTheme();
  const { reset } = useFormContext();
  const handleApplyPress = () => {
    onApply();
    onClose();
  };

  const handleCancelPress = () => {
    if (currentParams) {
      reset(currentParams);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.content, { backgroundColor: color.background }]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={[styles.title, { color: color.text }]}>Bộ lọc nâng cao</Text>
            <AppIcon onPress={onClose} icon={{ type: 'MaterialIcons', name: 'close' }} size={24} color={color.text} />
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <SearchFilterItem control={control} />
          </ScrollView>

          <View style={[styles.footer, { borderTopColor: color.border }]}>
            <AppButton
              title="Thiết lập lại"
              onPress={handleCancelPress}
              containerStyle={styles.btnCancel}
              titleStyle={styles.textCancel}
            />
            <AppButton
              title="Áp dụng"
              onPress={handleApplyPress}
              containerStyle={[
                styles.btnApply,
                { backgroundColor: color.primary },
              ]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
    maxHeight: '85%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#CCC',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  btnClose: {
    position: 'absolute',
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    borderTopWidth: 1,
  },
  btnCancel: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  textCancel: {
    color: '#666',
    fontWeight: 'bold',
  },
  btnApply: {
    flex: 2,
    borderRadius: 12,
  },
});
