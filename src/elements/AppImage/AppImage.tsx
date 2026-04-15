import React from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { no_image } from '../../utils';

interface AppImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
  onPress?: () => void; 
}

export function AppImage({ source, style, onPress, ...rest }: AppImageProps) {
  const imageSource = React.useMemo(() => {
    if (!source) return no_image;
    if (typeof source === 'number') return source;
    if (Array.isArray(source)) {
      return source.length > 0 ? source : no_image;
    }
    if (typeof source === 'object' && !source.uri) {
      return no_image;
    }
    return source;
  }, [source]);

  return (
    <TouchableOpacity
      testID="app-image-touchable"
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
    >
      <Image
        testID="app-image-component"
        source={imageSource}
        style={[styles.defaultImage, style]}
        {...rest}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
