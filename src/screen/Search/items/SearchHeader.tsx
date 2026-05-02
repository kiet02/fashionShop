import React, { useState } from 'react';
import { View } from 'react-native';
import { AppButton, AppTextInput } from '../../../elements';
import { SIZE } from '../../../utils';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { SearchFilter } from './SearchFilter';

interface SearchHeaderProps {
  control: any;
  onApply: () => void; // Hàm trigger gọi API
  currentParams: any; // Tham số lọc hiện tại
}

export function SearchHeader({
  control,
  onApply,
  currentParams,
}: SearchHeaderProps) {
  const { color } = useAppTheme();
  const [isVisible, setIsVisible] = useState(false);

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

      <AppButton
        iconLeft={{ type: 'MaterialIcons', name: 'filter-alt' }}
        containerStyle={{
          backgroundColor: color.primary,
          width: 50,
          height: 50,
          borderRadius: 10,
        }}
        onPress={() => setIsVisible(true)}
      />

      <SearchFilter
        control={control}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        onApply={onApply}
        currentParams={currentParams}
      />
    </View>
  );
}
