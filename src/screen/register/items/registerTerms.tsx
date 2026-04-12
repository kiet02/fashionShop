// RegisterTerms.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Props {
  acceptedTerms: boolean;
  onPress: () => void;
}

export function RegisterTerms({ acceptedTerms, onPress }: Props) {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();

  return (
    <View style={{ marginBottom: 20 }}>
      <BouncyCheckbox
        size={24}
        isChecked={acceptedTerms}
        onPress={onPress}
        fillColor={color.base}
        unFillColor={color.background}
        textComponent={
          <View
            style={{ flex: 1, flexDirection: 'row', marginLeft: 10, gap: 6 }}
          >
            <AppText
              text={language.register.terms}
              style={[
                styles.termsText,
                { color: color.base, fontWeight: 'bold' },
              ]}
            />
            <AppText
              text={language.register.and}
              style={[styles.termsText, { color: color.textSecondary }]}
            />
            <AppText
              text={language.register.policy}
              style={[
                styles.termsText,
                { color: color.base, fontWeight: 'bold' },
              ]}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  termsText: { fontSize: 13 },
});
