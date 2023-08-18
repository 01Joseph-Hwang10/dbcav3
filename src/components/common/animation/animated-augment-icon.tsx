import {augmentIconSize} from '@src/components/editor/icons/augment-icon';
import {ColorPalette} from '@src/themes/colors';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import CircularFrame, {PCircularFrame} from '../styled/circular-frame';
import {
  animatedValueProcessor,
  opacityProcessor,
  opacityUpdater,
  TranslateDirection,
  translationUpdater,
} from './animations';

interface PBase {
  direction: TranslateDirection;
  translateDistance: number;
  activate: boolean;
}

interface PAnimatedAugmentIcon
  extends PBase,
    Partial<PCircularFrame>,
    StyleMixin {
  circularFrame: boolean;
}

const AnimatedAugmentIcon: React.FC<PAnimatedAugmentIcon> = ({
  circularFrame,
  size,
  border,
  borderColor,
  borderWidth,
  backgroundColor,
  shadow,
  shadowLevel,
  style,
  direction,
  translateDistance,
  activate,
  children,
}) => {
  const opacity = useDerivedValue(opacityProcessor(activate), [activate]);
  const animatedOpacity = useAnimatedProps(opacityUpdater(opacity), [opacity]);
  const translate = useDerivedValue(
    animatedValueProcessor(activate, translateDistance),
    [activate],
  );
  const animatedTranslation = useAnimatedProps(
    translationUpdater(translate, direction),
    [translate],
  );

  if (circularFrame) {
    return (
      <CircularFrame
        style={[animatedOpacity, animatedTranslation, style]}
        size={size ?? augmentIconSize * 1.5} // defaults
        backgroundColor={backgroundColor ?? ColorPalette.whitesmoke} // defaults
        shadow={shadow ?? true} // defaults
        shadowLevel={shadowLevel ?? 4} // defaults
        animated={true}
        border={border}
        borderColor={borderColor}
        borderWidth={borderWidth}>
        {children}
      </CircularFrame>
    );
  }

  return (
    <Animated.View style={[animatedOpacity, animatedTranslation, style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedAugmentIcon;
