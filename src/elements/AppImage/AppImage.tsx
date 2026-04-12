import {
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import { no_image } from '../../utils';

interface AppImageProps extends ImageProps {
  source?: ImageProps['source'];
  style?: StyleProp<ImageStyle>;
  onpress?: () => void;
}

export function AppImage({ source, style, ...rest }: AppImageProps) {
  return (
    <TouchableOpacity
      testID="app-image"
      onPress={rest.onpress}
      disabled={!rest.onpress}
    >
      <Image
        testID="app-image-component"
        source={source || no_image}
        style={[{ width: 200, height: 200, resizeMode: 'contain', ...style }]}
        {...rest}
      />
    </TouchableOpacity>
  );
}
