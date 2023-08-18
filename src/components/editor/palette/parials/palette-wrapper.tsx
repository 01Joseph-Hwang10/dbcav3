import InsetsView from '@src/components/common/styled/insets-view';
import React from 'react';
import styled from 'styled-components/native';

const PaletteWrapperBase = styled(InsetsView)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

const PaletteWrapper: React.FC = ({children}) => (
  <PaletteWrapperBase direction="vertical" extraInsets={{top: 20}}>
    {children}
  </PaletteWrapperBase>
);

export default PaletteWrapper;
