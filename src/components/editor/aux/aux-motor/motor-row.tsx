import RoundedButton from '@src/components/common/button/rounded-button';
import {
  MotorBlock,
  MotorDatum,
} from '@src/modules/block-definitions/functions/blocks/motor';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';
import {ColorPalette} from '@src/themes/colors';
import {st} from '@src/themes/styles';
import {Event, EventRegistry} from '@src/modules/event/event';
import React from 'react';
import {Platform} from 'react-native';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import Label from '../partials/label';
import {displayVarNameHandler, switchHandler} from '@src/tools/handlers';
import Flex from '@src/components/common/styled/flex';
import styled from 'styled-components/native';
import Center from '@src/components/common/styled/center';
import {useUpdater} from '@src/hooks/useUpdater';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import {batch, useDispatch} from 'react-redux';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';
import {APP_MODE} from '@src/utils/config';

const RootView = styled(Center)`
  width: 100%;
  flex-direction: row;
  padding-right: ${switchHandler(Platform.OS === 'android', 10, 0)}px;
`;

interface PMotorRow {
  motorDatum: MotorDatum;
  rowIdx: number;
}

const getLabelValue = (portNumber: number): string => {
  if (APP_MODE === 'mod1') {
    switch (portNumber) {
      case 1:
        return 'Yaw';
      case 2:
        return 'Pitch';
      case 4:
        return 'Roll';
      case 5:
        return 'Throttle';
      default:
        return '';
    }
  }
  return `모터${portNumber}`;
};

const MotorRow: React.FC<PMotorRow> = ({motorDatum: {portNumber, thrust}}) => {
  useUpdater();
  const dispatch = useDispatch();
  const focusedBlock = useFocusedBlock<MotorBlock>();
  const onPress = () => {
    batch(() => {
      dispatch(setOptionMode(['variable', 'raw']));
      dispatch(setPaletteMode('options'));
      EventRegistry.on<IOptionItem<number | VarRef>>(
        Event.onChangeOption(),
        ({data}) => {
          focusedBlock?.setThrust({
            portNumber,
            thrust: data,
          });
        },
      );
    });
  };

  return (
    <RootView>
      <Flex flex={2} style={st.pl(10)}>
        <Label align="flex-start" value={getLabelValue(portNumber)} />
      </Flex>
      <Flex flex={1} style={st.mb(5)}>
        <RoundedButton
          style={st.bgColor(ColorPalette.deepBlue)}
          onPress={onPress}
          text={displayVarNameHandler(thrust)}
          focusable={true}
          backgroundColor={ColorPalette.deepBlue}
        />
      </Flex>
    </RootView>
  );
};

export default MotorRow;
