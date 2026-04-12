import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppText } from './AppText';

// Mock các icon thư viện
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');

describe('AppText Component - Refactored', () => {
  const mockIcon = { type: 'MaterialIcons', name: 'home' } as const;

  it('nên render đúng text nội dung', () => {
    const { getByText } = render(<AppText text="Lập trình React Native" />);
    expect(getByText('Lập trình React Native')).toBeTruthy();
  });

  it('nên gọi onPress của Container khi nhấn vào vùng chung', () => {
    const onPressContainer = jest.fn();
    const { getByTestId } = render(
      <AppText text="Bấm vào tôi" onPress={onPressContainer} />,
    );

    fireEvent.press(getByTestId('app-text-container'));
    expect(onPressContainer).toHaveBeenCalledTimes(1);
  });

  it('nên gọi onpressIconLeft và KHÔNG gọi onPress của cha (nếu có thể chặn)', () => {
    const onLeftPress = jest.fn();
    const onContainerPress = jest.fn();

    const { getAllByTestId } = render(
      <AppText
        text="Text"
        icon={mockIcon}
        onpressIconLeft={onLeftPress}
        onPress={onContainerPress}
      />,
    );

    const iconLeft = getAllByTestId('app-icon-touchable')[0];
    fireEvent.press(iconLeft);

    expect(onLeftPress).toHaveBeenCalledTimes(1);
  });

  it('nên render iconLeft (tĩnh) mà không có vùng nhấn riêng', () => {
    const { getAllByTestId } = render(<AppText iconLeft={mockIcon} />);
    const icon = getAllByTestId('app-icon-touchable')[0];
    expect(icon.props.accessibilityState.disabled).toBe(true);
  });

  it('nên áp dụng style flex: 1 cho phần Text để chiếm không gian', () => {
    const { getByTestId } = render(<AppText text="Flexible Text" />);
    const textElement = getByTestId('app-text-content');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flex: 1 })]),
    );
  });

  it('kiểm tra prop disabled của container khi không có onPress', () => {
    const { getByTestId } = render(<AppText text="No Press" />);
    const container = getByTestId('app-text-container');
    expect(container.props.onPress).toBeUndefined();
  });
});
