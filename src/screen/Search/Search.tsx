import { View } from 'react-native';
import { SearchHeader } from './items/SearchHeader';
import { useForm } from 'react-hook-form';
import { SearchBody } from './items/SearchBody';

export function Search() {
  const { control } = useForm();

  return (
    <View style={{ flex: 1 }}>
      <SearchHeader control={control} />
      <SearchBody />
    </View>
  );
}
