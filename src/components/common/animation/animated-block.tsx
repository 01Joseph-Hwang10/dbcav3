import {StyleMixin} from '@src/utils/types';
import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import AnimatedBackground from './animated-background';
import {animatedValueProcessor, animatedValueUpdater} from './animations';

interface PAnimatedBlock extends StyleMixin {
  activateBorder: boolean;
  activateColor: boolean;
  activeColor: string;
  inactiveColor: string;
  borderWidth: number;
}

const AnimatedBlock: React.FC<PAnimatedBlock> = ({
  activateBorder,
  activateColor,
  inactiveColor,
  activeColor,
  style,
  contentContainerStyle,
  children,
  borderWidth: gridBorderWidth,
}) => {
  const borderWidth = useDerivedValue(
    animatedValueProcessor(activateBorder, gridBorderWidth),
    [activateBorder],
  );
  const borderStyle = useAnimatedProps(
    animatedValueUpdater(borderWidth, 'borderWidth'),
    [borderWidth],
  );
  return (
    <Animated.View style={[borderStyle, style]}>
      <AnimatedBackground
        activate={activateColor}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        style={contentContainerStyle}>
        {children}
      </AnimatedBackground>
    </Animated.View>
  );
};

export default AnimatedBlock;
