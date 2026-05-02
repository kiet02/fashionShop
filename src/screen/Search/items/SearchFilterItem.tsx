import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form'; // Thêm useFormContext
import { IconVND, SIZE } from '../../../utils';
import { Dropdown } from 'react-native-element-dropdown';
import { AppIcon, AppTextInput } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';

const CATEGORY_DATA = [
  { label: 'Laptop', value: 'laptop' },
  { id: '2', label: 'CPU', value: 'cpu' },
  { label: 'VGA - Card đồ họa', value: 'vga' },
  { label: 'Mainboard', value: 'mainboard' },
  { label: 'RAM', value: 'ram' },
  { label: 'SSD/HDD', value: 'storage' },
  { label: 'Gaming Gear', value: 'gear' },
];

const BRAND_DATA = [
  { label: 'ASUS', value: 'asus' },
  { label: 'MSI', value: 'msi' },
  { label: 'GIGABYTE', value: 'gigabyte' },
  { label: 'Intel', value: 'intel' },
  { label: 'AMD', value: 'amd' },
  { label: 'Samsung', value: 'samsung' },
  { label: 'Razer', value: 'razer' },
  { label: 'Logitech', value: 'logitech' },
];

const CONDITION_DATA = [
  { label: 'Mới 100%', value: 'new' },
  { label: 'Hàng Like New', value: 'likenew' },
  { label: 'Đã qua sử dụng', value: 'used' },
];

export const SearchFilterItem = ({ control }: { control: any }) => {
  // Lấy setValue từ FormProvider để reset các field
  const { setValue } = useFormContext();
  const { color } = useAppTheme();

  // Hàm tiện ích: Xóa toàn bộ bộ lọc
  const handleClearAll = () => {
    setValue('filter.gender', '');
    setValue('filter.category', '');
    setValue('filter.brand', '');
    setValue('minPrice', '');
    setValue('maxPrice', '');
  };

  const renderDropdown = (title: string, name: string, data: any[], icon: string) => (
    <View style={styles.section}>
      <View style={styles.labelRow}>
        <AppIcon
          icon={{ type: 'MaterialIcons', name: icon as any }}
          size={18}
          color={color.primary}
        />
        <Text style={[styles.label, { color: color.text }]}>{title}</Text>
      </View>
      <Controller
        control={control}
        name={`filter.${name}`}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            style={[styles.dropdown, { borderColor: color.border }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={`Chọn ${title.toLowerCase()}`}
            value={value}
            onChange={item => onChange(item.value)}
            renderRightIcon={() => {
              if (value) {
                return (
                  <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={() => onChange('')}
                  >
                    <AppIcon
                      icon={{ type: 'MaterialIcons', name: 'cancel' }}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                );
              }
              return (
                <AppIcon
                  icon={{ type: 'MaterialIcons', name: 'keyboard-arrow-down' }}
                  size={24}
                  color="#999"
                />
              );
            }}
          />
        )}
      />
    </View>
  );


  return (
    <View style={styles.root}>
      <View style={styles.headerFilter}>
        <Text style={[styles.titleSection, { color: color.text }]}>Tùy chọn lọc</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={[styles.clearText, { color: color.primary }]}>Thiết lập lại</Text>
        </TouchableOpacity>
      </View>

      {renderDropdown('Danh mục', 'category', CATEGORY_DATA, 'category')}
      {renderDropdown('Thương hiệu', 'brand', BRAND_DATA, 'branding-watermark')}
      {renderDropdown('Tình trạng', 'condition', CONDITION_DATA, 'info-outline')}

      <View style={styles.labelRow}>
        <AppIcon
          icon={{ type: 'MaterialIcons', name: 'payments' }}
          size={18}
          color={color.primary}
        />
        <Text style={[styles.label, { color: color.text }]}>Khoảng giá (VNĐ)</Text>
      </View>
      <View style={styles.pricePlaceholder}>
        <AppTextInput
          control={control}
          name={'minPrice'}
          placeholder="Từ"
          keyboardType="number-pad"
          containerStyle={{ flex: 1 }}
          inputStyle={{ fontSize: 14 }}
        />
        <View style={styles.priceDivider} />
        <AppTextInput
          control={control}
          name={'maxPrice'}
          placeholder="Đến"
          keyboardType="number-pad"
          containerStyle={{ flex: 1 }}
          inputStyle={{ fontSize: 14 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: SIZE.PAD_M,
  },
  headerFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleSection: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  pricePlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceDivider: {
    width: 15,
    height: 1,
    backgroundColor: '#CCC',
    marginTop: -16, // Align with inputs
  },
});
