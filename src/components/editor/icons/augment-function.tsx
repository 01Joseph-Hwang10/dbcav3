import React, {useContext} from 'react';
import AugmentIcon, {augmentIconSize} from './augment-icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorPalette} from '@src/themes/colors';
import {AugmentButtonContext} from '@src/context/augment-button';
import {Directions} from 'react-native-gesture-handler';

const colorToggler = (on: boolean) =>
  on ? ColorPalette.gold : ColorPalette.whitesmoke;

const AugmentFunction: React.FC = () => {
  const {direction: joystickDirection} = useContext(AugmentButtonContext);
  const on = joystickDirection === Directions.RIGHT;
  return (
    <AugmentIcon direction="right" backgroundColor={colorToggler(on)}>
      <MaterialCommunityIcons
        name="function-variant"
        size={augmentIconSize}
        color={colorToggler(!on)}
      />
    </AugmentIcon>
  );
};

export default AugmentFunction;
