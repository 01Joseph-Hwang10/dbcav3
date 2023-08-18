import RoundedButton from '@src/components/common/button/rounded-button';
import {WaitBlock} from '@src/modules/block-definitions/functions/blocks/wait';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import {Platform} from 'react-native';
import AuxSection from './partials/aux-section';
import AuxWrapper, {AuxHeader} from './partials/aux-wrapper';
import {DroneBlockList} from './partials/block-list';
import Label from './partials/label';
import {Event, EventRegistry} from '@src/modules/event/event';
import {IOptionItem} from '../palette/option-list/option-list.utils';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';
import {displayVarNameHandler, switchHandler} from '@src/tools/handlers';
import {useUpdater} from '@src/hooks/useUpdater';
import {batch, useDispatch} from 'react-redux';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';
import Flex from '@src/components/common/styled/flex';
import styled from 'styled-components/native';
import Center from '@src/components/common/styled/center';

const Container = styled(Center)`
  width: 100%;
  flex-direction: row;
  padding-right: ${switchHandler(Platform.OS === 'android', 10, 0)}px;
`;

const ValueWrapper = styled(Center)`
  flex: 1;
  background-color: ${ColorPalette.deepBlue};
  border-radius: 5px;
  min-height: 20px;
  width: 100%;
`;

const renderHeader: AuxHeader = () => {
  return <DroneBlockList />;
};

const AuxWait: React.FC = () => {
  useUpdater();
  const dispatch = useDispatch();
  const focusedBlock = useFocusedBlock<WaitBlock>();
  const wait = focusedBlock?.value;
  const onPress = () => {
    batch(() => {
      dispatch(setOptionMode(['variable', 'raw']));
      dispatch(setPaletteMode('options'));
    });
    EventRegistry.on<IOptionItem<number | VarRef>>(
      Event.onChangeOption(),
      ({data}) => {
        focusedBlock?.setWaitFor(data);
      },
    );
  };
  return (
    <AuxWrapper renderHeader={renderHeader}>
      <AuxSection last={true}>
        <Container>
          <Flex flex={2} center={true}>
            <Label value="기다리기" />
          </Flex>
          <ValueWrapper>
            <RoundedButton
              onPress={onPress}
              text={displayVarNameHandler(wait)}
              focusable={true}
              backgroundColor={ColorPalette.deepBlue}
            />
          </ValueWrapper>
        </Container>
      </AuxSection>
    </AuxWrapper>
  );
};

export default AuxWait;
