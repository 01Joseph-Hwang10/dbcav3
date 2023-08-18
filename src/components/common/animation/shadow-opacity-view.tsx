import React from 'react';
import {useAnimatedProps, useDerivedValue} from 'react-native-reanimated';
import ShadowView, {PShadowView} from '../styled/shadow-view';
import {opacityProcessor, opacityUpdater} from './animations';
import {POpacityView} from './opacity-view';

interface PShadowOpacityView
  extends POpacityView,
    Pick<PShadowView, 'shadowLevel'> {}

const ShadowOpacityView: React.FC<PShadowOpacityView> = ({
  shadowLevel,
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
    <ShadowView
      shadowLevel={shadowLevel}
      style={[animatedStyle, style]}
      animated={true}>
      {children}
    </ShadowView>
  );
};

export default ShadowOpacityView;
