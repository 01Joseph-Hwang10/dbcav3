import {smallIconSize} from '@src/components/editor/icons/icons.utils';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {LeadingMixin} from './button.utils';

export const renderLeading = ({
  lock,
  deletable,
  leading,
  onLeadingPress,
}: LeadingMixin): React.ReactElement => {
  if (leading) {
    return (
      <TouchableOpacity onPress={onLeadingPress}>{leading}</TouchableOpacity>
    );
  }
  if (deletable) {
    return (
      <TouchableOpacity onPress={onLeadingPress}>
        <Feather
          name="x"
          size={(smallIconSize * 2) / 3}
          color={ColorPalette.black}
        />
      </TouchableOpacity>
    );
  }
  if (lock) {
    return (
      <Feather
        name="lock"
        size={(smallIconSize * 2) / 3}
        color={ColorPalette.black}
      />
    );
  }
  return <></>;
};
