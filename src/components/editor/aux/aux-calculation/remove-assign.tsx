import IconButton from '@src/components/common/button/icon-button';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 *
 * @todo Need to implement remove assignment row functionality
 */
const RemoveButtonAssign: React.FC = () => {
  const onPress = () => {};
  return (
    <IconButton onPress={onPress}>
      <Ionicons name="remove-circle" color={ColorPalette.black} size={20} />
    </IconButton>
  );
};

export default RemoveButtonAssign;
