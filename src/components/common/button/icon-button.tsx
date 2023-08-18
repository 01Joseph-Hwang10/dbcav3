import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Center from '../styled/center';
import {PressableMixin} from './button.utils';

const Container = styled(Center)`
  padding: 5px 0px;
  width: 100%;
  flex-direction: row;
`;

interface PIconButton extends PressableMixin {}

const IconButton: React.FC<PIconButton> = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>{children}</Container>
    </TouchableOpacity>
  );
};

export default IconButton;
