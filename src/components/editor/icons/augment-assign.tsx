import React, {useContext} from 'react';
import AugmentIcon, {augmentIconSize} from './augment-icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ColorPalette} from '@src/themes/colors';
import {AugmentButtonContext} from '@src/context/augment-button';
import {Directions} from 'react-native-gesture-handler';

const colorToggler = (on: boolean) =>
  on ? ColorPalette.skyblue : ColorPalette.whitesmoke;

const AugmentAssign: React.FC = () => {
  const {direction: joystickDirection} = useContext(AugmentButtonContext);
  const on = joystickDirection === Directions.DOWN;
  return (
    <AugmentIcon direction="down" backgroundColor={colorToggler(on)}>
      <MaterialIcons
        name="functions"
        size={augmentIconSize}
        color={colorToggler(!on)}
      />
    </AugmentIcon>
  );
};

export default AugmentAssign;
