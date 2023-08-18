import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import CircularFrame, {PCircularFrame} from '../styled/circular-frame';
import {commonIconSize} from '../helpers';

interface PCircleButton extends Partial<PCircularFrame> {
  onPress?: () => void;
}

const CircleButton: React.FC<PCircleButton> = ({
  children,
  onPress,
  size,
  backgroundColor,
  border,
  borderColor,
  borderWidth,
  ...rest
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CircularFrame
        size={size ?? commonIconSize * 1.5}
        backgroundColor={backgroundColor ?? ColorPalette.teal}
        border={border ?? true}
        borderColor={borderColor ?? ColorPalette.dark}
        borderWidth={borderWidth ?? 2.5}
        {...rest}>
        {children}
      </CircularFrame>
    </TouchableOpacity>
  );
};

export default CircleButton;
