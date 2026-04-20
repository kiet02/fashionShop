/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, View } from 'react-native';
import { AppButton, AppText } from '../../../elements';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { banner, SIZE } from '../../../utils';
export function HomeBanner() {
  const { language } = useAppLanguage();
  const { color } = useAppTheme();
  return (
    <ImageBackground
      source={banner}
      style={{
        width: SIZE.WIDTH_DEVICE(100),
        height: SIZE.HEIGHT_DP(50),
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: SIZE.WIDTH_DEVICE(70),
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <AppText
          text={language.home.bannerTitle}
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          }}
        />
        <AppButton
          title={language.home.bannerButton}
         containerStyle={{
            backgroundColor: color.base,
            borderRadius: 30,
            paddingHorizontal: 20,
          }}
          iconRight={{
            name: 'arrow-right',
            type: 'MaterialIcons',
            size: 24,
            color: 'white',
          }}
        />
      </View>
    </ImageBackground>
  );
}
