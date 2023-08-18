import {StyleMixin} from '@src/utils/types';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {getShadowStyle} from '../helpers';

export interface PCircularFrame extends StyleMixin {
  size: number;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  backgroundColor?: string;
  shadow?: boolean;
  shadowLevel?: number;
  animated?: boolean;
}

const CircularFrame: React.FC<PCircularFrame> = props => {
  const {children, style: customStyle, animated} = props;
  const {stylingStyle, shadowStyle, borderStyle} = getStyles(props);
  if (animated) {
    return (
      <Animated.View
        style={[stylingStyle, shadowStyle, borderStyle, customStyle]}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={[stylingStyle, shadowStyle, borderStyle, customStyle]}>
      {children}
    </View>
  );
};

// export default React.memo(CircularFrame);
export default CircularFrame;

const getStyles = ({
  size,
  backgroundColor,
  shadow,
  shadowLevel,
  border,
  borderColor,
  borderWidth,
}: PCircularFrame) => {
  const stylingStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  };

  let borderStyle;

  if (shadow) {
    borderStyle = {borderColor: 'transparent', borderWidth: 1};
  }
  if (border) {
    borderStyle = {borderColor, borderWidth};
  }

  return {
    stylingStyle,
    shadowStyle: shadow ? getShadowStyle(shadowLevel ?? 4) : {},
    borderStyle,
  };
};
