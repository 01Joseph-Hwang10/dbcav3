import IconButton from '@src/components/common/button/icon-button';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {smallIconSize} from '../../icons/icons.utils';
import {ColorPalette} from '@src/themes/colors';
import {useFocusedFunc} from '@src/hooks/redux-queries';

const AuxListFooter: React.FC = () => {
  const focusedFunc = useFocusedFunc();
  const addVar = () => {
    focusedFunc?.config.createInputVar();
  };
  return (
    <IconButton onPress={addVar}>
      <AntDesign
        name="pluscircle"
        size={smallIconSize}
        color={ColorPalette.black}
      />
    </IconButton>
  );
};

export default AuxListFooter;
