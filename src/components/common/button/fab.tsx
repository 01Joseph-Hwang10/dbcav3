import React from 'react';
import styled from 'styled-components/native';
import {center} from '../styled/center';
import InsetsView from '../styled/insets-view';
import CircleButton from './circle-button';
import {ColorPalette} from '@src/themes/colors';
import {PCircularFrame} from '../styled/circular-frame';

const AbsoluteAlign = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Container = styled(InsetsView)`
  ${center}
  padding: 10px;
`;

interface PFAB extends PCircularFrame {
  onPress?: () => void;
}

const FAB: React.FC<PFAB> = ({
  children,
  backgroundColor,
  shadow,
  shadowLevel,
  ...rest
}) => {
  return (
    <AbsoluteAlign>
      <Container direction="bottomRight">
        <CircleButton
          backgroundColor={backgroundColor ?? ColorPalette.teal}
          shadow={shadow ?? true}
          shadowLevel={shadowLevel ?? 4}
          {...rest}>
          {children}
        </CircleButton>
      </Container>
    </AbsoluteAlign>
  );
};

export default FAB;
