import { SearchHeader } from './items/SearchHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { SearchBody } from './items/SearchBody';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={{ flex: 1 }}>
        <SearchHeader
          control={methods.control}
          onApply={handleApply}
          currentParams={filterParams}
        />
        <SearchBody params={filterParams} />
      </SafeAreaView>
    </FormProvider>
  );
}
