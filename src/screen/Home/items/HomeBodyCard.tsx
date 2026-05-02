/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { no_image, SIZE } from '../../../utils';
import { AppIcon, AppImage, AppText } from '../../../elements';
import { BestProduct } from '../../../utils/fetchApi/type';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';
import { useNavigation } from '@react-navigation/native';
import { RouteStackProps } from '../../../navigation/type';

export function HomeBodyCard({ data }: { data: BestProduct }) {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();
  const cardWidth = SIZE.WIDTH_DP(45);
  const navigation = useNavigation<RouteStackProps<'Detail'>['navigation']>();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Detail', { id: data.id })}
      style={[
        {
          width: cardWidth,
          backgroundColor: '#FFFFFF',
          marginBottom: 16,
          borderRadius: 8,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: color.border,
        },
      ]}
    >
      <View>
        <AppImage
          source={data.productImage || no_image}
          style={{
            width: cardWidth,
            height: cardWidth,
            aspectRatio: 1,
          }}
        />
        {data.sale > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: '#FF0000',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
            }}
          >
            <AppText
              text={`-${data.sale}%`}
              style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}
            />
          </View>
        )}
      </View>

      <View style={{ padding: 10 }}>
        <AppText
          text={data.productName}
          numberOfLines={2}
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: color.text,
            height: 40,
          }}
        />

        <View style={{ marginTop: 8 }}>
          <AppText
            text={`${data.price.toLocaleString('vi-VN')}đ`}
            style={{ fontSize: 16, fontWeight: 'bold', color: color.primary }}
          />
          {data.sale > 0 && (
            <AppText
              text={`${(data.price * (1 + data.sale / 100)).toLocaleString(
                'vi-VN',
              )}đ`}
              style={{
                fontSize: 12,
                color: color.textSecondary,
                textDecorationLine: 'line-through',
              }}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppIcon
              icon={{ type: 'MaterialIcons', name: 'star' }}
              color="#FFD700"
              size={14}
            />
            <AppText
              text={data.rating.toString()}
              style={{ fontSize: 12, color: color.text, marginLeft: 4 }}
            />
          </View>
          <AppText
            text={`Đã bán: ${data.sold}`}
            style={{ fontSize: 10, color: color.textSecondary }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
