import {AugmentButtonContext} from '@src/context/augment-button';
import {ColorPalette} from '@src/themes/colors';
import React, {useContext} from 'react';
import {Directions} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import AugmentIcon, {augmentIconSize} from './augment-icon';

const colorToggler = (on: boolean) =>
  on ? ColorPalette.violet : ColorPalette.whitesmoke;

const AugmentFlow: React.FC = () => {
  const {direction: joystickDirection} = useContext(AugmentButtonContext);
  const on = joystickDirection === Directions.UP;
  return (
    <AugmentIcon direction="up" backgroundColor={colorToggler(on)}>
      <Entypo name="shuffle" size={augmentIconSize} color={colorToggler(!on)} />
    </AugmentIcon>
  );
};

export default AugmentFlow;
