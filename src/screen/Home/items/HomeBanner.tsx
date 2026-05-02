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
        height: SIZE.HEIGHT_DP(40),
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: 20,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: color.primary,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 4,
            alignSelf: 'flex-start',
            marginBottom: 12,
          }}
        >
          <AppText
            text="EXCLUSIVE"
            style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 }}
          />
        </View>

        <AppText
          text={language.home.bannerTitle}
          style={{
            color: '#FFFFFF',
            fontSize: 28,
            fontWeight: '900',
            textTransform: 'uppercase',
            width: '70%',
            lineHeight: 36,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}
        />

        <View style={{ height: 2, width: 60, backgroundColor: color.primary, marginVertical: 15 }} />

        <AppButton
          title={language.home.bannerButton}
          containerStyle={{
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            paddingHorizontal: 20,
            height: 40,
            alignSelf: 'flex-start',
          }}
          titleStyle={{
            color: color.primary,
            fontSize: 14,
            fontWeight: 'bold',
          }}
          iconRight={{
            name: 'bolt',
            type: 'MaterialIcons',
            size: 18,
            color: color.primary,
          }}
        />
      </View>
    </ImageBackground>
  );
}
