import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import Animated from 'react-native-reanimated';
import {getShadowStyle} from '../helpers';

export interface PShadowView {
  style?: StyleProp<ViewStyle>;
  shadowLevel: number;
  animated?: boolean;
}

const ShadowView: React.FC<PShadowView> = ({
  style: customStyle,
  shadowLevel,
  children,
  animated,
}) => {
  const shadowProps = getShadowStyle(shadowLevel);

  if (animated) {
    return (
      <Animated.View style={[shadowProps, customStyle]}>
        {children}
      </Animated.View>
    );
  }

  return <View style={[shadowProps, customStyle]}>{children}</View>;
};

export default ShadowView;
