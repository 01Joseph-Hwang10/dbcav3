import ModuleIcon from '@src/components/common/module-icon';
import {getModuleName} from '@src/modules/block-definitions/helpers';
import {FunctionBlock} from '@src/modules/block-definitions/functions/function';
import {setAuxMode} from '@src/redux/slices/editor';
import {setFocusedFuncIdx} from '@src/redux/slices/workspace';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import FocusableBox from '@src/components/common/styled/focusable-box';
import Center from '@src/components/common/styled/center';
import {Span} from '@src/components/common/styled/text';

const ItemBox = styled(FocusableBox)`
  flex-direction: row;
  width: 100%;
  border-radius: 20px;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 10px;
`;

const IconWrapper = styled(Center)`
  width: 30%;
  margin-right: 5px;
  flex-direction: row;
`;

const NameBox = styled.View`
  width: 70%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

interface PFunctionItem {
  func: FunctionBlock;
  funcIdx: number;
}

const FunctionItem: React.FC<PFunctionItem> = ({func, funcIdx}) => {
  const dispatch = useDispatch();
  const focusedFuncIdx = useSelector(
    (state: RootState) => state.workspace.focusedFuncIdx,
  );
  const focused = funcIdx === focusedFuncIdx;
  const onPress = () => {
    batch(() => {
      dispatch(setFocusedFuncIdx(funcIdx));
      dispatch(setAuxMode('config'));
    });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <ItemBox focused={focused}>
        <IconWrapper>
          <ModuleIcon module={getModuleName(func?.funcName)} size={24} />
        </IconWrapper>
        <NameBox>
          <Span size={20} align="left">
            {func?.funcName?.truncate(4)}
          </Span>
        </NameBox>
      </ItemBox>
    </TouchableOpacity>
  );
};

export default FunctionItem;
