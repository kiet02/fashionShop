/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { no_image, SIZE } from '../../../utils';
import { AppImage, AppText } from '../../../elements';
import { Products } from '../../../utils/fetchApi/type';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';

export function SearchBodyCard({ data }: { data: Products }) {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();
  const cardWidth = SIZE.WIDTH_DP(45);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        { width: cardWidth, backgroundColor: color.card, marginBottom: 16 },
      ]}
    >
      <AppImage
        source={no_image}
        style={{
          width: cardWidth,
          height: cardWidth,
          aspectRatio: 1,
          backgroundColor: color.border,
        }}
      />

      <View style={{ padding: 10 }}>
        <AppText
          text={data.productName}
          numberOfLines={1}
          style={{ fontSize: 14, fontWeight: '600', color: color.text }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <AppText
            text={`$${data.price} VND`}
            style={{ fontSize: 14, fontWeight: 'bold', color: color.primary }}
          />
          <AppText
            text={`${language.home.sold}: ${data.sold}`}
            style={{ fontSize: 10, color: color.textSecondary }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
