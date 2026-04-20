import { DimensionValue } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const SIZE = {
  WIDTH_DEVICE: (percentage?: number): DimensionValue =>
    `${percentage || 100}%`,
  HEIGHT_DEVICE: (percentage?: number): DimensionValue =>
    `${percentage || 100}%`,
  WIDTH_DP: (percentage: number) => wp(percentage),
  HEIGHT_DP: (percentage: number) => hp(percentage),

  TEXT_TITLE_XL: 30,
  TEXT_TITLE_L: 24,
  TEXT_TITLE_M: 20,
  TEXT_TITLE_S: 18,
  TEXT_BODY_L: 16,
  TEXT_BODY_M: 14,
  TEXT_DESC_S: 12,
  TEXT_CAPTION: 10,

  PAD_XS: 4,
  PAD_S: 8,
  PAD_M: 16,
  PAD_L: 24,
  PAD_XL: 32,

  MAR_XS: 4,
  MAR_S: 8,
  MAR_M: 16,
  MAR_L: 24,

  GAP_S: 8,
  GAP_M: 16,
};