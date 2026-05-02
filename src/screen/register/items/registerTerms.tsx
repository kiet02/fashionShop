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
        fillColor="#FFFFFF"
        unFillColor="transparent"
        iconStyle={{ borderColor: '#FFFFFF' }}
        innerIconStyle={{ borderWidth: 2, borderColor: '#FFFFFF' }}
        textComponent={
          <View
            style={{ flex: 1, flexDirection: 'row', marginLeft: 10, gap: 6 }}
          >
            <AppText
              text={language.register.terms}
              style={[
                styles.termsText,
                { color: '#FFFFFF', fontWeight: 'bold', textDecorationLine: 'underline' },
              ]}
            />
            <AppText
              text={language.register.and}
              style={[styles.termsText, { color: '#FFFFFF' }]}
            />
            <AppText
              text={language.register.policy}
              style={[
                styles.termsText,
                { color: '#FFFFFF', fontWeight: 'bold', textDecorationLine: 'underline' },
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
