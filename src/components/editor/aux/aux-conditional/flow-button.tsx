import RoundedButton from '@src/components/common/button/rounded-button';
import {
  Flow,
  IfBlock,
} from '@src/modules/block-definitions/functions/blocks/if';
import {ColorPalette} from '@src/themes/colors';
import {Event, EventRegistry} from '@src/modules/event/event';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IOptionItem} from '../../palette/option-list/option-list.utils';
import {batch, useDispatch} from 'react-redux';
import {setOptionMode, setPaletteMode} from '@src/redux/slices/editor';
import Center from '@src/components/common/styled/center';
import styled from 'styled-components/native';
import {useFocusedBlock} from '@src/hooks/redux-queries';

const Wrapper = styled(Center)`
  width: 100%;
  padding: 0px 10px;
`;

/**
 * @deprecated Currently flow is not used since the Rabbit language is following ruby syntax
 */
const FlowButton: React.FC = () => {
  const focusedBlock = useFocusedBlock<IfBlock>();
  const flow = focusedBlock?.flow;
  const dispatch = useDispatch();
  const onPress = () => {
    batch(() => {
      dispatch(setPaletteMode('options'));
      dispatch(setOptionMode(['flow!']));
    });
    EventRegistry.on<IOptionItem<Flow>>(Event.onChangeOption(), ({data}) => {
      focusedBlock?.setFlow(data);
    });
  };
  return (
    <Wrapper>
      <RoundedButton
        style={styles.flowButton}
        text={flow.displayName ?? ''}
        onPress={onPress}
        focusable={true}
        backgroundColor={ColorPalette.violet}
      />
    </Wrapper>
  );
};

export default FlowButton;

const styles = StyleSheet.create({
  flowButton: {
    backgroundColor: ColorPalette.violet,
    minHeight: 30,
    marginTop: 5,
  },
});
