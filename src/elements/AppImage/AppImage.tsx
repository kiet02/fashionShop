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
    if (typeof source === 'number') return source;
    if (typeof source === 'object' && 'uri' in source && !source.uri)
      return no_image;
    return source;
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
