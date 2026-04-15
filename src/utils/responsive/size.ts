import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SIZE = {
  width: (percentage: number) => wp(percentage),
  height: (percentage: number) => hp(percentage),
  font: (percentage: number) => hp(percentage),
  WIDTH_DEVICE: wp(100),
  HEIGHT_DEVICE: hp(100),
  TEXTSIZE12: 12,
  TEXTSIZE14: 14,
  TEXTSIZE16: 16,
  TEXTSIZE18: 18,
  TEXTSIZE20: 20,
  TEXTSIZE22: 22,
  TEXTSIZE24: 24,
  TEXTSIZE26: 26,
  TEXTSIZE28: 28,
};

export { SIZE };
