import { supabase } from "../supabase";

export async function useSupabaseSearch() {
const handleSearch = async (query:string) => {
  const { data, error } = await supabase
    .from('items')
    .select('name, price, description')
    .textSearch('fts', query, {
      config: 'simple',
      type: 'websearch',
    });

    if (error) {
        console.error('Lỗi tìm kiếm:', error);
        return [];
    }
    return {data, error};
    };
    return { handleSearch };
  }