import {trianglePos} from '@src/components/config-drone/hexagon-panel/helpers';
import {st} from '@src/themes/styles';
import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {animatedValueProcessor} from './animations';

interface PAnimatedHexagonPart {
  activate: boolean;
  portNumber: number;
}

const translateDistance = 25;

const AnimatedHexagonPart: React.FC<PAnimatedHexagonPart> = ({
  activate,
  children,
  portNumber,
}) => {
  const insets = useSafeAreaInsets();
  const translate = useDerivedValue(
    animatedValueProcessor(activate, translateDistance),
    [activate],
  );

  const triangleStyle = useAnimatedProps(
    () => trianglePos(portNumber, insets, translate.value),
    [translate],
  );

  return (
    <Animated.View style={[triangleStyle, st.center, st.absolute, st.z(10)]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedHexagonPart;
