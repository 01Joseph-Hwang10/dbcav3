import React, {useContext} from 'react';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';
import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import {Event, EventRegistry} from '@src/modules/event/event';
import CompareRow from '../partials/compare-row';
import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import {ForBlock} from '@src/modules/block-definitions/functions/blocks/for';
import {IfBlock} from '@src/modules/block-definitions/functions/blocks/if';
import {handleError} from '@src/tools/debug';
import {displayVarNameHandler} from '@src/tools/handlers';
import {FunctionInputContext} from '@src/context/function-input';
import {
  OptionScope,
  setOptionMode,
  setPaletteMode,
} from '@src/redux/slices/editor';
import {useUpdater} from '@src/hooks/useUpdater';
import {batch, useDispatch} from 'react-redux';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import styled from 'styled-components/native';

const RootView = styled.View`
  padding: 0px 5px;
  margin-top: 5px;
`;

interface PInputRow {
  variable: VarBlock;
  rowIdx: number;
}

const InputRow: React.FC<PInputRow> = ({variable}) => {
  useUpdater();
  const dispatch = useDispatch();
  const focusedBlock = useFocusedBlock();
  const {varName, value} = variable;
  const context = useContext(FunctionInputContext);
  const onPress = () => {
    batch(() => {
      dispatch(setPaletteMode('options'));
      const optionMode: OptionScope[] = ['variable', 'raw'];
      if (context?.includeIterator) {
        optionMode.push('iterator');
      }
      dispatch(setOptionMode(optionMode));
    });
    EventRegistry.on<IOptionItem<number | VarRef>>(
      Event.onChangeOption(),
      ({data}) => {
        switch (focusedBlock?.name) {
          case 'for':
            (focusedBlock as ForBlock)?.body?.setInput(varName, data);
            break;
          case 'if':
            (focusedBlock as IfBlock)?.flow?.callbackBlock?.setInput(
              varName,
              data,
            );
            break;
          case 'function':
            (focusedBlock as CallFunctionBlock)?.setInput(varName, data);
            break;
          default:
            handleError(focusedBlock?.name);
            break;
        }
      },
    );
  };
  return (
    <RootView>
      <CompareRow
        onRightPress={onPress}
        leftValue={varName}
        centerValue="="
        rightValue={displayVarNameHandler(value)}
        leftFocusable={false}
        centerFocusable={false}
      />
    </RootView>
  );
};

export default InputRow;
