import React from 'react';
import AuxCalculation from './aux/aux-calculation';
import AuxConfig from './aux/aux-config';
import AuxFor from './aux/aux-for';
import AuxFunction from './aux/aux-function';
import {AuxConditional} from './aux/aux-conditional';
import AuxMotor from './aux/aux-motor';
import AuxVariable from './aux/aux-variable';
import AuxWait from './aux/aux-wait';
import Placeholder from '@src/components/common/placeholder';
import {ColorPalette} from '@src/themes/colors';
import styled from 'styled-components/native';
import InsetsView from '../common/styled/insets-view';
import AuxEnd from './aux/aux-end';
import {useAuxMode} from '@src/hooks/redux-queries';
import {useSelector} from 'react-redux';
import {AllBlockList} from './aux/partials/block-list';

const AuxInner: React.FC = () => {
  const auxMode = useAuxMode();
  const focusedBlockIdx = useSelector(
    (state: RootState) => state.workspace.focusedBlockIdx,
  );
  switch (auxMode) {
    case 'assign':
      return <AuxCalculation />;
    case 'config':
      return <AuxConfig />;
    case 'motor':
    case 'control':
      return <AuxMotor />;
    case 'wait':
      return <AuxWait />;
    case 'for':
      return <AuxFor />;
    case 'function':
      return <AuxFunction />;
    case 'if':
    case 'while':
      return <AuxConditional />;
    case 'end':
      return <AuxEnd />;
    case 'variable':
      return <AuxVariable />;
  }
  if (focusedBlockIdx < 0) return <Placeholder text="선택된 항목 없음" />;
  return <AllBlockList />;
};

const Container = styled(InsetsView)`
  height: 100%;
  flex: 4;
  background-color: ${ColorPalette.whitesmoke};
`;

const Aux: React.FC = () => (
  <Container direction="exceptLeft">
    <AuxInner />
  </Container>
);

export default Aux;
