import RoundedButton from '@src/components/common/button/rounded-button';
import {ForBlock} from '@src/modules/block-definitions/functions/blocks/for';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';
import {ColorPalette} from '@src/themes/colors';
import {Event, EventRegistry} from '@src/modules/event/event';
import React from 'react';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import {displayVarNameHandler} from '@src/tools/handlers';
import {st} from '@src/themes/styles';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import {useDispatch} from 'react-redux';
import {useUpdater} from '@src/hooks/useUpdater';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';

const LoopCountButton: React.FC = () => {
  useUpdater();
  const dispatch = useDispatch();
  const focusedBlock = useFocusedBlock<ForBlock>();
  const count = focusedBlock.loopCount;
  const onPress = () => {
    dispatch(setPaletteMode('options'));
    dispatch(setOptionMode(['variable', 'raw']));
    EventRegistry.on<IOptionItem<number | VarRef>>(
      Event.onChangeOption(),
      ({data}) => {
        focusedBlock?.setLoopCount(data);
      },
    );
  };
  return (
    <RoundedButton
      style={st.bgColor(ColorPalette.deepBlue)}
      text={displayVarNameHandler(count)}
      onPress={onPress}
      focusable={true}
      backgroundColor={ColorPalette.deepBlue}
    />
  );
};

export default LoopCountButton;
