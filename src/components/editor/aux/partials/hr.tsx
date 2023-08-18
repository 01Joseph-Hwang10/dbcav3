import {ColorPalette} from '@src/themes/colors';
import styled from 'styled-components/native';

interface PHr {
  gap?: number;
}

const Hr = styled.View<PHr>`
  width: 100%;
  height: 1px;
  background-color: ${ColorPalette.gray};
  margin: ${({gap}) => gap ?? 10}px 0px;
`;

export default Hr;
