import React from 'react';
import styled from 'styled-components/native';
import Center from '../../common/styled/center';
import BLEButton from './ble-button';
import HomeButton from './home-button';
import ResetButton from './reset-button';

const Container = styled(Center)`
  flex-direction: row;
`;

const Divider = styled.View`
  width: 7px;
  height: 100%;
`;

const BottomButtons: React.FC = () => {
  return (
    <Container>
      <BLEButton />
      <Divider />
      <ResetButton />
      <Divider />
      <HomeButton />
    </Container>
  );
};

export default BottomButtons;
