import RoundedButton from '@src/components/common/button/rounded-button';
import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import {FuncRef} from '@src/modules/block-definitions/functions/func-ref';
import {ColorPalette} from '@src/themes/colors';
import {Event, EventRegistry} from '@src/modules/event/event';
import {Nullable} from '@src/utils/types';
import React from 'react';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import {displayFuncNameHandler} from '@src/tools/handlers';
import {useUpdater} from '@src/hooks/useUpdater';
import {useDispatch} from 'react-redux';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';
import styled from 'styled-components/native';
import {st} from '@src/themes/styles';

const Wrapper = styled.View`
  margin-top: 10px;
  padding: 0px 15px;
`;

interface IExecuteFuncButton {
  functionBlock: Nullable<CallFunctionBlock>;
}

const SelectFunction: React.FC<IExecuteFuncButton> = ({functionBlock}) => {
  useUpdater();
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(setPaletteMode('options'));
    dispatch(setOptionMode(['function']));
    EventRegistry.on<IOptionItem<FuncRef>>(Event.onChangeOption(), ({data}) => {
      functionBlock?.setCallback(data);
    });
  };
  return (
    <Wrapper>
      <RoundedButton
        style={st.bgColor(ColorPalette.white)}
        contentContainerStyle={st.fontColor(ColorPalette.black)}
        text={displayFuncNameHandler(functionBlock)}
        onPress={onPress}
        focusable={true}
        backgroundColor={ColorPalette.white}
      />
    </Wrapper>
  );
};

export default SelectFunction;
