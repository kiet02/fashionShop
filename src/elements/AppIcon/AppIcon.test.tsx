import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppIcon, IconConfig } from './AppIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');

describe('AppIcon Component', () => {
  it('nên render đúng icon từ MaterialIcons', () => {
    const iconConfig: IconConfig = { type: 'MaterialIcons', name: 'home' };
    const { UNSAFE_getByType } = render(
      <AppIcon icon={iconConfig} size={30} color="red" />,
    );

    const icon = UNSAFE_getByType(MaterialIcons);
    expect(icon.props.name).toBe('home');
    expect(icon.props.size).toBe(30);
    expect(icon.props.color).toBe('red');
  });

  it('nên render đúng icon từ FontAwesome', () => {
    const iconConfig: IconConfig = { type: 'FontAwesome', name: 'user' };
    const { UNSAFE_getByType } = render(<AppIcon icon={iconConfig} />);

    const icon = UNSAFE_getByType(FontAwesome);
    expect(icon.props.name).toBe('user');
  });

  it('nên gọi onPress khi được nhấn', () => {
    const onPressMock = jest.fn();
    const iconConfig: IconConfig = { type: 'MaterialIcons', name: 'search' };
    const { getByTestId } = render(
      <AppIcon icon={iconConfig} onPress={onPressMock} />,
    );

    const touchable = getByTestId('app-icon-touchable');
    fireEvent.press(touchable);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('nên disable TouchableOpacity nếu không có onPress', () => {
    const iconConfig: IconConfig = { type: 'MaterialIcons', name: 'home' };
    const { getByTestId } = render(<AppIcon icon={iconConfig} />);

    const touchable = getByTestId('app-icon-touchable');
    expect(touchable.props.accessibilityState.disabled).toBe(true);
  });
});
