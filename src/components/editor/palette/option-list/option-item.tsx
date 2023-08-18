import {setInputOpened} from '@src/redux/slices/editor';
import {ColorPalette} from '@src/themes/colors';
import {Event, EventRegistry} from '@src/modules/event/event';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import OptionIcon from './option-icon';
import {IOptionItem, OptionItem as OptionItemType} from './option-list.utils';
import styled from 'styled-components/native';
import {Span} from '@src/components/common/styled/text';
import Center from '@src/components/common/styled/center';

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${ColorPalette.gray};
  width: 100%;
`;

const IconBox = styled(Center)`
  width: 30%;
  margin-right: 5px;
  flex-direction: row;
`;

const Label = styled.View`
  width: 70%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

interface POptionItem {
  option: OptionItemType;
}

const OptionItem: React.FC<POptionItem> = ({option}) => {
  const {displayName, type} = option;
  const dispatch = useDispatch();
  const onPress = () => {
    if (type === 'input') {
      dispatch(setInputOpened(true));
    } else {
      EventRegistry.emit<IOptionItem>(Event.onChangeOption(), option);
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <IconBox>
          <OptionIcon type={type} size={24} />
        </IconBox>
        <Label>
          <Span size={20} color={ColorPalette.dark}>
            {displayName}
          </Span>
        </Label>
      </Container>
    </TouchableOpacity>
  );
};

export default OptionItem;
