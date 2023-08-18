import RoundedInput from '@src/components/common/inputs/rounded-input';
import RoundedButton from '@src/components/common/button/rounded-button';
import React from 'react';
import AuxSection from '../partials/aux-section';
import Label from '../partials/label';
import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import AuxWrapper from '../partials/aux-wrapper';
import AuxVarItem from './var-item';
import AuxListFooter from './list-footer';
import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import {st} from '@src/themes/styles';
import {ColorPalette} from '@src/themes/colors';
import AuxDeleteButton from '../partials/delete-button';
import {useDispatch} from 'react-redux';
import {deleteFunc} from '@src/redux/slices/workspace';
import {useFocusedFunc} from '@src/hooks/redux-queries';
import styled from 'styled-components/native';
import Center from '@src/components/common/styled/center';
import {useUpdater} from '@src/hooks/useUpdater';

const ResetButton = styled(RoundedButton)`
  background-color: ${ColorPalette.deepBlue};
`;

const Wrapper = styled(Center)`
  width: 100%;
  padding: 0px 10px;
  margin-top: 5px;
`;

const renderVarItem: ListViewItem<VarBlock> = ({item: localVar}) => (
  <AuxVarItem inputVar={localVar} />
);

const keyExtractor = (_: VarBlock, index: number) => `varInput${index}`;

const AuxConfig: React.FC = () => {
  useUpdater();
  const focusedFunc = useFocusedFunc();
  const dispatch = useDispatch();
  const lock = focusedFunc?.isMain() || focusedFunc?.isSensor();
  const updateFuncName = (newFuncName: string) => {
    focusedFunc?.config.setFuncName(newFuncName);
  };
  const clearFunction = () => {
    focusedFunc?.clearBlocks();
  };
  const deleteFunction = () => {
    dispatch(deleteFunc(focusedFunc?.index ?? -1));
  };
  const renderFooter = () => (
    <AuxDeleteButton onPress={deleteFunction} lock={lock} />
  );
  const onActionsPress = (text?: string) => {
    text && updateFuncName(text);
  };
  return (
    <AuxWrapper renderFooter={renderFooter}>
      <AuxSection>
        <Label value="함수 이름" />
        <Wrapper>
          <RoundedInput
            defaultValue={focusedFunc?.funcName}
            lock={lock}
            submit={true}
            required={true}
            onSubmit={updateFuncName}
            onActionsPress={onActionsPress}
          />
        </Wrapper>
      </AuxSection>
      {focusedFunc?.funcName !== '메인' && (
        <AuxSection>
          <Label value="파라미터" />
          <ListView
            style={st.w('100%')}
            contentContainerStyle={[
              st.justify('flex-start'),
              st.align('center'),
            ]}
            ListFooterComponent={AuxListFooter}
            keyExtractor={keyExtractor}
            renderItem={renderVarItem}
            data={focusedFunc?.config.inputVars ?? ([] as VarBlock[])}
          />
        </AuxSection>
      )}
      <AuxSection last={true}>
        <Wrapper>
          <ResetButton onPress={clearFunction} text="초기화" />
        </Wrapper>
      </AuxSection>
    </AuxWrapper>
  );
};

export default AuxConfig;
