import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import {setAuxMode} from '@src/redux/slices/editor';
import {setFocusedVarId} from '@src/redux/slices/workspace';
import {ColorPalette} from '@src/themes/colors';
import {withOpacity} from '@src/tools/string-tools';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import FocusableBox from '@src/components/common/styled/focusable-box';
import {Bold, Span} from '@src/components/common/styled/text';

const ItemBox = styled(FocusableBox)`
  flex-direction: row;
  width: 100%;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
`;

const TextBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

interface PVariableItem {
  variable: VarBlock;
}

const VariableItem: React.FC<PVariableItem> = ({variable}) => {
  const dispatch = useDispatch();
  const focusedVarId = useSelector(
    (state: RootState) => state.workspace.focusedVarId,
  );
  const focused = variable.id === focusedVarId;
  const onPress = () => {
    batch(() => {
      dispatch(setFocusedVarId(variable.id));
      dispatch(setAuxMode('variable'));
    });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <ItemBox focused={focused}>
        <TextBox>
          <Bold size={16} color={withOpacity(ColorPalette.black, 0.8)}>
            {variable.varName}
          </Bold>
        </TextBox>
        <TextBox>
          <Span color={ColorPalette.gray}>{variable.value ?? ''}</Span>
        </TextBox>
      </ItemBox>
    </TouchableOpacity>
  );
};

export default VariableItem;
