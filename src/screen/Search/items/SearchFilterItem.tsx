import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form'; // Thêm useFormContext
import { IconVND, SIZE } from '../../../utils';
import { Dropdown } from 'react-native-element-dropdown';
import { AppIcon, AppTextInput } from '../../../elements';

// --- Dữ liệu mẫu cho các Dropdown ---
const GENDER_DATA = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Trẻ con', value: 'kids' },
];

const CATEGORY_DATA = [
  { label: 'Giày', value: 'shoes' },
  { label: 'Quần áo', value: 'clothing' },
  { label: 'Phụ kiện', value: 'accessories' },
];

const BRAND_DATA = [
  { label: 'Nike', value: 'nike' },
  { label: 'Adidas', value: 'adidas' },
  { label: 'Puma', value: 'puma' },
];

export const SearchFilterItem = ({ control }: { control: any }) => {
  // Lấy setValue từ FormProvider để reset các field
  const { setValue } = useFormContext();

  // Hàm tiện ích: Xóa toàn bộ bộ lọc
  const handleClearAll = () => {
    setValue('filter.gender', '');
    setValue('filter.category', '');
    setValue('filter.brand', '');
    setValue('minPrice', '');
    setValue('maxPrice', '');
  };

  const renderDropdown = (title: string, name: string, data: any[]) => (
    <View style={styles.section}>
      <Text style={styles.label}>{title}</Text>
      <Controller
        control={control}
        name={`filter.${name}`}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            style={styles.dropdown}
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
                // Đã đổi Text 'X' thành AppIcon cho chuyên nghiệp
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
                  icon={{ type: 'MaterialIcons', name: 'arrow-drop-down' }}
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
        <Text style={styles.titleSection}>Bộ lọc chi tiết</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearText}>Xóa tất cả</Text>
        </TouchableOpacity>
      </View>

      {renderDropdown('Giới tính', 'gender', GENDER_DATA)}
      {renderDropdown('Thể loại', 'category', CATEGORY_DATA)}
      {renderDropdown('Hãng', 'brand', BRAND_DATA)}

      <Text style={styles.label}>Khoảng giá</Text>
      <View style={styles.pricePlaceholder}>
        <AppTextInput
          control={control}
          name={'minPrice'}
          placeholder="Tối thiểu" // Thêm placeholder
          keyboardType="number-pad"
          containerStyle={{ flex: 1 }}
          iconRightComponent={<IconVND style={{ marginRight: 8 }} />}
        />
        <AppTextInput
          control={control}
          name={'maxPrice'}
          placeholder="Tối đa" // Thêm placeholder
          keyboardType="number-pad"
          containerStyle={{ flex: 1 }}
          iconRightComponent={<IconVND style={{ marginRight: 8 }} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: SIZE.PAD_S,
  },
  headerFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZE.MAR_L,
  },
  titleSection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  clearText: {
    fontSize: 14,
    color: '#FF4D4F', // Màu đỏ hoặc primary color của app bạn
    fontWeight: '600',
  },
  section: {
    marginBottom: SIZE.MAR_M,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#000',
  },
  containerStyle: {
    borderRadius: 8,
    marginTop: 4,
  },
  pricePlaceholder: {
    height: 60,
    gap: 12,
    flexDirection: 'row',
  },
});
