import React from 'react';
import {useSelector} from 'react-redux';
import FunctionList from './palette/function-list';
import VariableList from './palette/variable-list';
import OptionList from './palette/option-list/option-list';
import {ColorPalette} from '@src/themes/colors';
import InsetsView from '../common/styled/insets-view';
import {fill} from '../common/styled/fill';
import styled from 'styled-components/native';

const PaletteInner: React.FC = () => {
  const paletteMode = useSelector(
    (state: RootState) => state.editor.paletteMode,
  );
  switch (paletteMode) {
    case 'files':
      return <FunctionList />;
    case 'variables':
      return <VariableList />;
    case 'options':
      return <OptionList />;
    default:
      return <></>;
  }
};

const Container = styled(InsetsView)`
  ${fill}
  flex: 3;
  flex-direction: row;
  background-color: ${ColorPalette.whitesmoke};
`;

const Palette: React.FC = () => (
  <Container direction="vertical">
    <PaletteInner />
  </Container>
);

export default Palette;
