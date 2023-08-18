import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import Animated, {withTiming} from 'react-native-reanimated';
import {hexagonPartAnimationDuration} from '../../config-drone/constants';
import {
  easeInCubic,
  easeOutCubic,
} from '../../config-drone/hexagon-panel/helpers';

export interface OpacityImmediate {
  atActivate: boolean;
  atInactivate: boolean;
}

export const opacityProcessor =
  (
    activate: boolean,
    immediate?: Partial<OpacityImmediate>,
    duration?: number,
  ) =>
  () => {
    'worklet';
    if (activate) {
      if (immediate?.atActivate) {
        return 1;
      }
      return withTiming(1, {
        duration: duration ?? hexagonPartAnimationDuration,
        easing: easeOutCubic,
      });
    }
    if (immediate?.atInactivate) {
      return 0;
    }
    return withTiming(0, {
      duration: duration ?? hexagonPartAnimationDuration,
      easing: easeInCubic,
    });
  };

export const opacityUpdater = (opacity: Animated.SharedValue<number>) => () => {
  'worklet';
  return {
    opacity: opacity.value,
  };
};

export const animatedValueProcessor =
  (activate: boolean, value: number | string, duration?: number) => () => {
    'worklet';
    if (activate) {
      return withTiming(value, {
        duration: duration ?? hexagonPartAnimationDuration,
        easing: easeOutCubic,
      });
    }
    return withTiming(0, {
      duration: duration ?? hexagonPartAnimationDuration,
      easing: easeInCubic,
    });
  };

export const animatedValueUpdater =
  (
    value: Readonly<Animated.SharedValue<number | string>>,
    property: keyof ViewStyle & TextStyle & ImageStyle,
  ) =>
  () => {
    'worklet';
    let style = {};
    // @ts-ignore
    style[property] = value.value;
    return style;
  };

export const sizeUpdater = (size: Animated.SharedValue<number>) => () => {
  'worklet';
  return {
    transform: [
      {
        scale: size.value,
      },
    ],
  };
};

export type TranslateDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'topRight'
  | 'topLeft'
  | 'bottomRight'
  | 'bottomLeft';

export const translationUpdater =
  (translate: Animated.SharedValue<number>, direction: TranslateDirection) =>
  () => {
    'worklet';
    let coefX = 0;
    let coefY = 0;
    if (direction === 'topLeft') coefX = coefY = -1;
    if (direction === 'topRight') {
      coefX = 1;
      coefY = -1;
    }
    if (direction === 'bottomLeft') {
      coefX = -1;
      coefY = 1;
    }
    if (direction === 'bottomRight') coefX = coefY = 1;
    if (direction === 'up') coefY = -1;
    if (direction === 'down') coefY = 1;
    if (direction === 'left') coefX = -1;
    if (direction === 'right') coefX = 1;
    return {
      transform: [
        {
          translateX: translate.value * coefX,
        },
        {
          translateY: translate.value * coefY,
        },
      ],
    };
  };
