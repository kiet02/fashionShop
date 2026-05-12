import { SearchHeader } from './items/SearchHeader';
import { FormProvider, useForm } from 'react-hook-form';
import { SearchBody } from './items/SearchBody';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

export function Search() {
  const route = useRoute<any>();
  const methods = useForm({
    defaultValues: {
      search: '',
      minPrice: '',
      maxPrice: '',
      filter: { gender: '', category: '', brand: '' },
    },
  });

  const [filterParams, setFilterParams] = useState(methods.getValues());

  // Listen for parameters from navigation (e.g. from HomeCategories)
  useEffect(() => {
    if (route.params?.category || route.params?.gender) {
      const newFilter = {
        gender: route.params.gender || '',
        category: route.params.category || '',
        brand: '',
      };
      
      const newValues = {
        ...methods.getValues(),
        filter: newFilter,
      };

      methods.reset(newValues);
      setFilterParams(newValues);
    }
  }, [route.params, methods]);

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
