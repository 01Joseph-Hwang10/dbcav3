import {StyleMixin} from '@src/utils/types';
import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {OpacityImmediate, opacityProcessor, opacityUpdater} from './animations';

export interface POpacityView extends StyleMixin {
  immediate?: Partial<OpacityImmediate>;
  activate: boolean;
}

const OpacityView: React.FC<POpacityView> = ({
  immediate,
  activate,
  children,
  style,
}) => {
  const opacity = useDerivedValue(opacityProcessor(activate, immediate), [
    activate,
  ]);

  const animatedStyle = useAnimatedProps(opacityUpdater(opacity), [opacity]);
  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default OpacityView;
