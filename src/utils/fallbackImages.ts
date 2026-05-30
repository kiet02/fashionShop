import { no_image } from './index';

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'PC Gaming': 'https://hoanghapc.vn/media/product/250_5101_pc_3301_tan_cooler_master_620s.jpg',
  'VGA': 'https://hoanghapc.vn/media/product/250_4521_hhpc_black_sky_4080_galax_ha1.jpg',
  'Monitor': 'https://hoanghapc.vn/media/product/250_5026_talos_e3_mesh_elite_black_ha8.jpg',
  'Keyboard': 'https://hoanghapc.vn/media/product/250_3208_pc_gaming_sama_3301_hyper_212_ha2.jpg',
  'Laptop': 'https://hoanghapc.vn/media/product/250_4916_hhpc_lumi_2_13500_4070_ha3.jpg',
  'Mouse': 'https://hoanghapc.vn/media/product/250_4540_hhpc_mini_lumi_ii_white_i3_13100f_ha6.jpg',
};

export function getFallbackImage(category?: string | null) {
  const defaultFallback = { uri: CATEGORY_FALLBACK_IMAGES['PC Gaming'] };

  if (!category) return defaultFallback;
  
  // Find matching category (case insensitive)
  const key = Object.keys(CATEGORY_FALLBACK_IMAGES).find(
    k => k.toLowerCase() === category.toLowerCase()
  );

  if (key) {
    return { uri: CATEGORY_FALLBACK_IMAGES[key] };
  }

  return defaultFallback;
}
