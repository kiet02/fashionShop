import React from 'react';
import { Modal, View, StyleSheet, ScrollView, Text } from 'react-native';
import { AppButton } from '../../../elements';
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
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Bộ lọc nâng cao</Text>
          </View>

          <ScrollView style={styles.body}>
            <SearchFilterItem control={control} />
          </ScrollView>

          <View style={styles.footer}>
            <AppButton
              title="Hủy"
              onPress={handleCancelPress}
              containerStyle={styles.btnCancel}
            />
            <AppButton
              title="Áp dụng"
              onPress={handleApplyPress}
              containerStyle={[
                styles.btnApply,
                { backgroundColor: color.base },
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    width: '90%', // Rộng ra một chút cho đẹp
    maxHeight: '80%', // Đừng để modal cao quá màn hình
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  header: {
    padding: SIZE.PAD_M,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    paddingHorizontal: SIZE.PAD_M,
  },
  footer: {
    flexDirection: 'row',
    padding: SIZE.PAD_M,
    gap: SIZE.GAP_M,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  btnCancel: {
    flex: 1,
    backgroundColor: '#ff0000', // Nền xám nhạt cho nút Hủy
    borderRadius: 8,
  },
  textCancel: {
    color: '#666',
    fontWeight: '600',
  },
  btnApply: {
    flex: 1,
    borderRadius: 8,
  },
});
