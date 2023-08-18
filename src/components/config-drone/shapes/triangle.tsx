import {
  animatedValueUpdater,
  opacityProcessor,
} from '@src/components/common/animation/animations';
import {ColorPalette} from '@src/themes/colors';
import {st} from '@src/themes/styles';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {mixColor} from 'react-native-redash';
import {triangleSideLength} from '../constants';

interface TriangleProps {
  onFocus: boolean;
}

const triangleSideConstant = triangleSideLength / Math.sqrt(3);

const Triangle: React.FC<TriangleProps> = ({children, onFocus}) => {
  const animatedColor = useDerivedValue(opacityProcessor(onFocus), [onFocus]);

  const interpolatedColor = useDerivedValue(
    () =>
      mixColor(animatedColor.value, ColorPalette.whitesmoke, ColorPalette.teal),
    [animatedColor],
  );

  const animatedStyle = useAnimatedProps(
    animatedValueUpdater(interpolatedColor, 'borderBottomColor'),
    [interpolatedColor],
  );

  return (
    <Animated.View style={[styles.triangle, st.center, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default Triangle;

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: triangleSideConstant,
    borderRightWidth: triangleSideConstant,
    borderBottomWidth: triangleSideLength,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
