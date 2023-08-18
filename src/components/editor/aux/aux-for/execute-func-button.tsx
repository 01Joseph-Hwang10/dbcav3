import RoundedButton from '@src/components/common/button/rounded-button';
import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import {ForBlock} from '@src/modules/block-definitions/functions/blocks/for';
import {FuncRef} from '@src/modules/block-definitions/functions/func-ref';
import {ColorPalette} from '@src/themes/colors';
import {Event, EventRegistry} from '@src/modules/event/event';
import React from 'react';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import {displayFuncNameHandler} from '@src/tools/handlers';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import {useDispatch} from 'react-redux';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';
import styled from 'styled-components/native';
import {st} from '@src/themes/styles';

const Wrapper = styled.View`
  width: 100%;
  padding: 0px 10px;
  margin-top: 10px;
`;

/**
 * @deprecated This component is not used anymore since our languate (Rabbit) now follows ruby syntax.
 */
const ExecuteFuncButton: React.FC = () => {
  const focusedBlock = useFocusedBlock<ForBlock>();
  const dispatch = useDispatch();
  const body = focusedBlock?.body;
  const onPress = () => {
    dispatch(setPaletteMode('options'));
    dispatch(setOptionMode(['function']));
    EventRegistry.on<IOptionItem<FuncRef>>(Event.onChangeOption(), ({data}) => {
      focusedBlock?.setBody(new CallFunctionBlock(data));
    });
  };
  return (
    <Wrapper>
      <RoundedButton
        style={st.bgColor(ColorPalette.violet)}
        text={displayFuncNameHandler(body)}
        onPress={onPress}
        focusable={true}
        backgroundColor={ColorPalette.violet}
      />
    </Wrapper>
  );
};

export default ExecuteFuncButton;
