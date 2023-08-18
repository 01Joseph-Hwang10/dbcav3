import React from 'react';
import styled from 'styled-components/native';
import Fill from '../common/styled/fill';
import InsetsView from '../common/styled/insets-view';
import Grid from './workspace/grid';

const Container = styled(InsetsView)`
  height: 100%;
  flex: 8;
`;

const Workspace: React.FC = () => (
  <Container direction="vertical">
    <Fill center={true}>
      <Grid />
    </Fill>
  </Container>
);

export default Workspace;
