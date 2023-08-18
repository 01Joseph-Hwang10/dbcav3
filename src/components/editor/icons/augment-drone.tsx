import React, {useContext} from 'react';
import AugmentIcon, {augmentIconSize} from './augment-icon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorPalette} from '@src/themes/colors';
import {AugmentButtonContext} from '@src/context/augment-button';
import {Directions} from 'react-native-gesture-handler';

const colorToggler = (on: boolean) =>
  on ? ColorPalette.green : ColorPalette.whitesmoke;

const AugmentDrone: React.FC = () => {
  const {direction: joystickDirection} = useContext(AugmentButtonContext);
  const on = joystickDirection === Directions.LEFT;
  return (
    <AugmentIcon direction="left" backgroundColor={colorToggler(on)}>
      <AntDesign name="API" size={augmentIconSize} color={colorToggler(!on)} />
    </AugmentIcon>
  );
};

export default AugmentDrone;
