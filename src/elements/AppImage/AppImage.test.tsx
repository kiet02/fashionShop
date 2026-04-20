import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppImage } from './AppImage';

// Mock hình ảnh mặc định
jest.mock('../../utils', () => ({
  no_image: { uri: 'no_image_mock' },
}));

describe('AppImage Component', () => {
  it('nên hiển thị hình ảnh từ source được cung cấp', () => {
    const source = { uri: 'https://example.com/test.jpg' };
    const { getByTestId } = render(<AppImage source={source} />);
    const image = getByTestId('app-image-component');

    expect(image.props.source).toEqual(source);
  });

  it('nên hiển thị no_image khi không truyền source', () => {
    const { getByTestId } = render(<AppImage source={undefined} />);
    const image = getByTestId('app-image-component');

    expect(image.props.source).toEqual({ uri: 'no_image_mock' });
  });

  it('nên gọi onPress khi người dùng nhấn vào hình ảnh', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      // Sửa từ onpress -> onPress
      <AppImage source={{ uri: 'test' }} onPress={onPressMock} />,
    );

    // Sửa từ app-image -> app-image-touchable
    const touchable = getByTestId('app-image-touchable');
    fireEvent.press(touchable);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('nên hiển thị no_image khi source là object rỗng không có uri', () => {
    const { getByTestId } = render(<AppImage source={{ uri: '' } as any} />);
    const image = getByTestId('app-image-component');

    expect(image.props.source).toEqual({ uri: 'no_image_mock' });
  });

  it('nên áp dụng style mặc định và style tùy chỉnh cho Image', () => {
    const customStyle = { borderRadius: 10 };
    const { getByTestId } = render(
      <AppImage source={{ uri: 'test' }} style={customStyle} />,
    );
    const image = getByTestId('app-image-component');

    // Kiểm tra gộp style (styles.defaultImage + customStyle)
    expect(image.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 200,
          height: 200,
          resizeMode: 'contain',
        }),
        expect.objectContaining({ borderRadius: 10 }),
      ]),
    );
  });

  it('nên disable TouchableOpacity khi không có onPress', () => {
    const { getByTestId } = render(<AppImage source={{ uri: 'test' }} />);
    const touchable = getByTestId('app-image-touchable');

    expect(touchable.props.accessibilityState.disabled).toBe(true);
  });
});
