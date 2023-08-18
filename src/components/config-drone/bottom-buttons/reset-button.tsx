import {resetDrone} from '@src/redux/slices/config-drone';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {commonIconSize} from '@src/components/common/helpers';
import CircleButton from '@src/components/common/button/circle-button';
import {APP_MODE} from '@src/utils/config';

const ResetButton: React.FC = () => {
  const dispatch = useDispatch();
  const onPress = () => {
    if (APP_MODE === 'mod1') return;
    dispatch(resetDrone());
  };

  return (
    <CircleButton
      onPress={onPress}
      backgroundColor={'grey'}
      borderColor={ColorPalette.teal}>
      <Entypo
        name="cycle"
        size={commonIconSize * 0.75}
        color={ColorPalette.dark}
      />
    </CircleButton>
  );
};

export default ResetButton;
