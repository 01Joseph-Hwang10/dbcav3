import {ColorPalette} from '@src/themes/colors';
import {switchHandler} from '@src/tools/handlers';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {View, ViewStyle} from 'react-native';

/**
 * @description This hook is specific to FocusableBox component defined below.
 */
const useFocusedStyle = (
  focused: boolean,
  style?: {
    borderWidth?: number;
    focusedBorderColor?: string;
    notFocusedBorderColor?: string;
  },
): ViewStyle => {
  const focusedStyle: ViewStyle = {
    borderWidth: style?.borderWidth ?? 2,
    borderColor: style?.focusedBorderColor ?? ColorPalette.gold,
  };

  const notFocusedStyle: ViewStyle = {
    borderWidth: style?.borderWidth ?? 2,
    borderColor: style?.notFocusedBorderColor ?? ColorPalette.transparent,
  };

  return switchHandler(focused, focusedStyle, notFocusedStyle);
};

interface PFocusableBox extends StyleMixin {
  focused: boolean;
  onFocusedColor?: string;
  onNotFocusedColor?: string;
  borderWidth?: number;
}

const FocusableBox: React.FC<PFocusableBox> = ({
  children,
  focused,
  onFocusedColor,
  onNotFocusedColor,
  borderWidth,
  style,
}) => {
  const focusedStyle = useFocusedStyle(focused, {
    borderWidth,
    focusedBorderColor: onFocusedColor,
    notFocusedBorderColor: onNotFocusedColor,
  });
  return <View style={[focusedStyle, style]}>{children}</View>;
};

export default FocusableBox;
