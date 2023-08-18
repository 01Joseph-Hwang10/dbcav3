import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ActionsMixin} from './button.utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ColorPalette} from '@src/themes/colors';
import {smallIconSize} from '@src/components/editor/icons/icons.utils';

export const renderActions = ({
  submit,
  actions,
  onActionsPress,
}: ActionsMixin): React.ReactElement => {
  const onPress = () => {
    onActionsPress && onActionsPress();
  };
  if (actions) {
    return <TouchableOpacity onPress={onPress}>{actions}</TouchableOpacity>;
  }
  if (submit) {
    return (
      <TouchableOpacity onPress={onPress}>
        <AntDesign
          name="checkcircle"
          color={ColorPalette.black}
          size={(smallIconSize * 2) / 3}
        />
      </TouchableOpacity>
    );
  }
  return <></>;
};
