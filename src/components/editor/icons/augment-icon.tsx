import AnimatedAugmentIcon from '@src/components/common/animation/animated-augment-icon';
import {TranslateDirection} from '@src/components/common/animation/animations';
import {commonIconSize} from '@src/components/common/helpers';

import {SwitchContext} from '@src/context/switch';
import {Nullable} from '@src/utils/types';
import React, {useContext} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

interface PAugmentIcon {
  style?: StyleProp<ViewStyle>;
  direction: TranslateDirection;
  backgroundColor?: Nullable<string>;
}

export const augmentIconSize = commonIconSize * 0.7;
export const animatedIconDistance = 40;

const AugmentIcon: React.FC<PAugmentIcon> = ({
  children,
  style,
  direction,
  backgroundColor,
}) => {
  const [hover] = useContext(SwitchContext);

  return (
    <AnimatedAugmentIcon
      style={[styles.root, style]}
      circularFrame={true}
      direction={direction}
      activate={hover}
      backgroundColor={backgroundColor ?? undefined}
      translateDistance={animatedIconDistance}>
      {children}
    </AnimatedAugmentIcon>
  );
};

export default AugmentIcon;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});
