import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import React from 'react';
import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import InputRow from './input-row';
import Placeholder from '@src/components/common/placeholder';
import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import {Nullable} from '@src/utils/types';
import {
  FunctionInputCtxProvider,
  IFunctionInputContext,
} from '@src/context/function-input';
import {st} from '@src/themes/styles';
import {useUpdater} from '@src/hooks/useUpdater';
import styled from 'styled-components/native';

const renderItem: ListViewItem<VarBlock> = ({item: variable, index}) => {
  return <InputRow variable={variable} rowIdx={index} />;
};

const keyExtractor = (_: VarBlock, index: number) => `input${index}`;

const Wrapper = styled.View`
  width: 100%;
  height: 20px;
  margin-top: 10px;
`;

const ListEmptyComponent: React.FC = () => {
  return (
    <Wrapper>
      <Placeholder text="없음" />
    </Wrapper>
  );
};

interface PFunctionListInput {
  functionBlock: Nullable<CallFunctionBlock>;
  functionInputContext?: IFunctionInputContext;
}

const FunctionListInput: React.FC<PFunctionListInput> = ({
  functionBlock,
  functionInputContext,
}) => {
  useUpdater();
  const inputs = functionBlock?.inputs ?? [];
  return (
    <FunctionInputCtxProvider value={functionInputContext}>
      <ListView
        data={inputs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        style={st.w('100%')}
        contentContainerStyle={[st.justify('flex-start'), st.align('center')]}
      />
    </FunctionInputCtxProvider>
  );
};

export default FunctionListInput;
