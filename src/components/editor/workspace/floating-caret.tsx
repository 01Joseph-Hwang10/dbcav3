import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

const Align = styled.View`
  position: absolute;
  left: -15px;
`;

const FloatingCaret = () => {
  return (
    <Align>
      <FontAwesome5Icon size={30} name="caret-square-right" />
    </Align>
  );
};

export default FloatingCaret;
