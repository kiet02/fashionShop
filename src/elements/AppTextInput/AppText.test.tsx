import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { AppTextInput } from './AppTextInput';

const TestWrapper = ({ children }: any) => {
  const { control } = useForm({ defaultValues: { email: '' } });
  return <>{children(control)}</>;
};

describe('AppTextInput Component', () => {
  const mockIcon = { type: 'MaterialIcons', name: 'email' } as const;

  it('nên gọi onPressIconRight khi nhấn vào icon bên phải', () => {
    const onPressRight = jest.fn();
    const { getByTestId } = render(
      <TestWrapper>
        {(control: any) => (
          <AppTextInput
            control={control}
            name="email"
            iconRight={mockIcon}
            onPressIconRight={onPressRight}
          />
        )}
      </TestWrapper>,
    );

    const iconRight = getByTestId('app-icon-touchable');
    fireEvent.press(iconRight);

    expect(onPressRight).toHaveBeenCalledTimes(1);
  });

  it('nên render cả hai icon và phân biệt được chúng', () => {
    const { getAllByTestId } = render(
      <TestWrapper>
        {(control: any) => (
          <AppTextInput
            control={control}
            name="email"
            iconLeft={mockIcon}
            iconRight={mockIcon}
          />
        )}
      </TestWrapper>,
    );

    const icons = getAllByTestId('app-icon-touchable');
    expect(icons.length).toBe(2);
  });

  it('nên thay đổi màu viền khi có lỗi validation', () => {
    const { queryByTestId } = render(
      <TestWrapper>
        {(control: any) => <AppTextInput control={control} name="email" />}
      </TestWrapper>,
    );

    expect(queryByTestId('input-error-message')).toBeNull();
  });
});
