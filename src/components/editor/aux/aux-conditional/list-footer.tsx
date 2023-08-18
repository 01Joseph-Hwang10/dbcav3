import IconButton from '@src/components/common/button/icon-button';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {smallIconSize} from '../../icons/icons.utils';
import {ColorPalette} from '@src/themes/colors';
import {IfBlock} from '@src/modules/block-definitions/functions/blocks/if';
import {useFocusedBlock} from '@src/hooks/redux-queries';

/**
 * @deprecated Currently only one conditional statement can be added on if, while
 */
const AuxIfListFooter: React.FC = () => {
  const focusedBlock = useFocusedBlock<IfBlock>();
  const addVar = () => {
    focusedBlock?.createCondition();
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

export default AuxIfListFooter;
