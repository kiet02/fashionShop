import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { AppButton } from './AppButton';

describe('AppButton Component', () => {
  it('renders the title correctly when provided', () => {
    const { getByText } = render(<AppButton title="Click Me" />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('renders children instead of title if both are provided', () => {
    const { getByText, queryByText } = render(
      <AppButton title="Ignored Title">
        <Text>Custom Child</Text>
      </AppButton>,
    );
    expect(getByText('Custom Child')).toBeTruthy();
    expect(queryByText('Ignored Title')).toBeNull();
  });

  it('calls onPress when the button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <AppButton title="Press" onPress={onPressMock} />,
    );

    const button = getByTestId('app-button');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom container styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <AppButton
        title="Styled"
        containerStyle={customStyle}
        testID="button-container"
      />,
    );

    const view = getByTestId('button-container').children[0];
    if (typeof view !== 'string') {
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ backgroundColor: 'red' }),
        ]),
      );
    }
  });

  it('renders without crashing for different button types', () => {
    const { rerender, getByText } = render(
      <AppButton type="TouchableOpacity" title="Touch" />,
    );
    expect(getByText('Touch')).toBeTruthy();
    rerender(<AppButton type="TouchableHighlight" title="Highlight" />);
    expect(getByText('Highlight')).toBeTruthy();
  });
});
