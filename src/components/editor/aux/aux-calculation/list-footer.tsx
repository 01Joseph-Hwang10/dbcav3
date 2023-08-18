import IconButton from '@src/components/common/button/icon-button';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {smallIconSize} from '../../icons/icons.utils';
import {ColorPalette} from '@src/themes/colors';
import {AssignBlock} from '@src/modules/block-definitions/functions/blocks/assign';
import {handleError} from '@src/tools/debug';
import {useFocusedBlock, useFocusedFunc} from '@src/hooks/redux-queries';

const AuxCalculationListFooter: React.FC = () => {
  const focusedFunc = useFocusedFunc();
  const focusedBlock = useFocusedBlock<AssignBlock>();
  const addVar = () => {
    if (!focusedFunc || focusedBlock?.name !== 'assign') {
      handleError({focusedFunc, name: focusedBlock?.name});
      return;
    }
    focusedBlock.createAssignment();
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

export default AuxCalculationListFooter;
