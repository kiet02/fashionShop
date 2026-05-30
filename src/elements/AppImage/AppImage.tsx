import React, { useState, useEffect } from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { no_image } from '../../utils';

import { getFallbackImage } from '../../utils/fallbackImages';

interface AppImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
  category?: string;
}

export function AppImage({
  source,
  style,
  onPress,
  onError,
  category,
  ...rest
}: AppImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset lỗi khi source thay đổi (ví dụ: FlatList reuse item)
  useEffect(() => {
    setHasError(false);
  }, [source]);

  const resolvedSource: ImageSourcePropType = React.useMemo(() => {
    const fallback = getFallbackImage(category);

    if (hasError) return fallback;
    if (!source) return fallback;
    if (typeof source === 'number') return source;

    let uri = '';

    if (typeof source === 'string') {
      uri = source;
    } else if (typeof source === 'object') {
      if ('uri' in source && typeof source.uri === 'string') {
        uri = source.uri;
      } else if ('large' in source || 'small' in source || 'original' in source) {
        // Handle ProductImage object from backend
        const imgObj = source as any;
        uri = imgObj.large || imgObj.original || imgObj.small || '';
      }
    }

    if (!uri) return fallback;

    // Fix SSL issue for old CDN domain
    uri = uri.replace('hoanghapccdn.com', 'hoanghapc.vn');

    return { uri };
  }, [source, hasError, category]);

  const ImageComponent = (
    <Image
      testID="app-image-component"
      source={resolvedSource}
      style={[styles.defaultImage, style]}
      onError={e => {
        setHasError(true);
        onError?.(e); // Vẫn cho caller biết nếu cần
      }}
      {...rest}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity
        testID="app-image-touchable"
        onPress={onPress}
        activeOpacity={0.8}
      >
        {ImageComponent}
      </TouchableOpacity>
    );
  }

  return ImageComponent;
}

const styles = StyleSheet.create({
  defaultImage: {
    width: '100%',
    height: '100%',
    // Không fix resizeMode ở đây — để caller kiểm soát qua prop
  },
});
