import { View } from 'react-native';
import { SearchHeader } from './items/SearchHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { SearchBody } from './items/SearchBody';
import { useState } from 'react';

export function Search() {
  const methods = useForm({
    defaultValues: {
      search: '',
      minPrice: '',
      maxPrice: '',
      filter: { gender: '', category: '', brand: '' },
    },
  });

  const [filterParams, setFilterParams] = useState(methods.getValues());

  const handleApply = () => {
    setFilterParams(methods.getValues());
  };

  return (
    <FormProvider {...methods}>
      <View style={{ flex: 1 }}>
        <SearchHeader
          control={methods.control}
          onApply={handleApply}
          currentParams={filterParams}
        />
        <SearchBody params={filterParams} />
      </View>
    </FormProvider>
  );
}
