import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppText } from './AppText';

// Mock các thư viện icon
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');

describe('AppText Component', () => {
  const mockIcon = { type: 'MaterialIcons', name: 'home' } as const;

  it('nên render đúng nội dung văn bản từ prop text', () => {
    const { getByText } = render(<AppText text="Lập trình React Native" />);
    expect(getByText('Lập trình React Native')).toBeTruthy();
  });

  it('nên ưu tiên hiển thị children thay vì prop text', () => {
    const { getByText, queryByText } = render(
      <AppText text="Text Prop">Nội dung từ Children</AppText>,
    );
    expect(getByText('Nội dung từ Children')).toBeTruthy();
    expect(queryByText('Text Prop')).toBeNull();
  });

  it('nên gọi onPress của Container khi được nhấn', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <AppText text="Bấm vào tôi" onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId('app-text-container'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('nên gọi onPressIconLeft khi nhấn vào icon bên trái', () => {
    const onLeftPress = jest.fn();
    const { getAllByTestId } = render(
      <AppText text="Text" iconLeft={mockIcon} onPressIconLeft={onLeftPress} />,
    );

    // AppIcon sử dụng testID="app-icon-touchable" bên trong nó
    const icons = getAllByTestId('app-icon-touchable');
    fireEvent.press(icons[0]); // Icon trái là phần tử đầu tiên

    expect(onLeftPress).toHaveBeenCalledTimes(1);
  });

  it('nên gọi onPressIconRight khi nhấn vào icon bên phải', () => {
    const onRightPress = jest.fn();
    const { getAllByTestId } = render(
      <AppText
        text="Text"
        iconRight={mockIcon}
        onPressIconRight={onRightPress}
      />,
    );

    const icons = getAllByTestId('app-icon-touchable');
    const iconRight = icons[icons.length - 1]; // Lấy icon cuối cùng
    fireEvent.press(iconRight);

    expect(onRightPress).toHaveBeenCalledTimes(1);
  });

  it('nên chặn sự kiện nổi bọt (bubbling) lên cha khi nhấn vào Icon', () => {
    const onIconPress = jest.fn();
    const onContainerPress = jest.fn();

    const { getAllByTestId } = render(
      <AppText
        text="Text"
        iconLeft={mockIcon}
        onPressIconLeft={onIconPress}
        onPress={onContainerPress}
      />,
    );

    const icon = getAllByTestId('app-icon-touchable')[0];
    fireEvent.press(icon);

    expect(onIconPress).toHaveBeenCalledTimes(1);
    expect(onContainerPress).not.toHaveBeenCalled(); // Cha không được kích hoạt
  });

  it('nên render icon ở trạng thái disabled khi không có hàm onPressIcon', () => {
    const { getAllByTestId } = render(<AppText iconLeft={mockIcon} />);
    const icon = getAllByTestId('app-icon-touchable')[0];

    // Kiểm tra tính chất disabled của Touchable bên trong AppIcon
    expect(icon.props.accessibilityState.disabled).toBe(true);
  });

  it('kiểm tra Container là View (không có onPress) khi không truyền prop onPress', () => {
    const { getByTestId } = render(<AppText text="No Press" />);
    const container = getByTestId('app-text-container');

    // View thông thường sẽ không nhận prop onPress như TouchableOpacity
    expect(container.props.onPress).toBeUndefined();
  });
});
