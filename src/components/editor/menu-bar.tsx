import React from 'react';
import {FlexStyle, Platform} from 'react-native';
import DroneIcon from './icons/drone';
import ExecuteIcon from './icons/execute';
import FileIcon from './icons/files';
import VariableIcon from './icons/variable';
import OptionsIcon from './icons/options';
import {ColorPalette} from '@src/themes/colors';
import styled from 'styled-components/native';
import Fill from '../common/styled/fill';
import InsetsView from '../common/styled/insets-view';

const Container = styled(InsetsView)`
  height: 100%;
  padding: 10px;
  background-color: ${ColorPalette.teal};
  padding-left: ${Platform.OS === 'android' ? 10 : 0}px;
`;

interface PAlign {
  align: FlexStyle['justifyContent'];
}

const Align = styled.View<PAlign>`
  align-items: center;
  justify-content: ${({align}) => align};
  width: 100%;
`;

const Wrapper = styled(Fill)`
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
`;

const MenuBar: React.FC = () => {
  return (
    <Container direction="vertical">
      <Wrapper>
        <Align align="flex-start">
          <FileIcon />
          <OptionsIcon />
          <VariableIcon />
        </Align>
        <Align align="flex-end">
          <ExecuteIcon />
          <DroneIcon />
        </Align>
      </Wrapper>
    </Container>
  );
};

export default MenuBar;
