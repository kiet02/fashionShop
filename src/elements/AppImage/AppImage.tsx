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
import { LOCALHOST } from '@env';
import { API } from '../../utils/fetchApi/api';

interface AppImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

export function AppImage({
  source,
  style,
  onPress,
  onError,
  ...rest
}: AppImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset lỗi khi source thay đổi (ví dụ: FlatList reuse item)
  useEffect(() => {
    setHasError(false);
  }, [source]);

  const resolvedSource: ImageSourcePropType = React.useMemo(() => {
    if (hasError) return no_image;
    if (!source) return no_image;

    const baseUrl = LOCALHOST || 'http://10.0.2.2:8080';

    if (typeof source === 'number') return source;

    if (typeof source === 'string') {
      if ((source).startsWith('http')) {
        return { uri: source };
      }

      // Handle relative paths from API
      // If the path contains 'user', use user endpoint, otherwise default to product
      const isUserImage = source.toLowerCase().includes('user') || source.startsWith('u_');
      const endpoint = isUserImage ? 'api/v1/user/image' : 'api/v1/product/image';

      return { uri: `${baseUrl}/${endpoint}/${source}` };
    }

    if (typeof source === 'object' && 'uri' in source) {
      const uri = (source as any).uri;
      if (!uri) return no_image;
      if (typeof uri === 'string' && !uri.startsWith('http')) {
        const imagePath = uri.startsWith('/') ? uri : API.Image(uri);
        const fullUrl = `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
        return { ...source, uri: fullUrl };
      }
      return source as ImageSourcePropType;
    }

    return source as ImageSourcePropType;
  }, [source, hasError]);

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
