/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { AppTextInput } from '../../../elements';
import { SIZE } from '../../../utils';
interface SearchHeaderProps {
  control: any;
  onApply: () => void; // Hàm trigger gọi API
  currentParams: any; // Tham số lọc hiện tại
}

export function SearchHeader({
  control,
  onApply,
}: SearchHeaderProps) {

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: SIZE.MAR_M,
        gap: SIZE.GAP_M,
        marginBottom: SIZE.MAR_S, // Thêm chút margin dưới cho thoáng
      }}
    >
      <AppTextInput
        iconLeft={{ type: 'MaterialIcons', name: 'search' }}
        control={control}
        name="search"
        placeholder="Search..."
        containerStyle={{ flex: 1 }}
        onSubmitEditing={onApply}
        returnKeyType="search"
      />


    </View>
  );
}
