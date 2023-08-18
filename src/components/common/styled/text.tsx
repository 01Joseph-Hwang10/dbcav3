import styled from 'styled-components/native';
import {StyleMixin} from '@src/utils/types';
import {TextStyle} from 'react-native';
import {ColorPalette} from '@src/themes/colors';

interface Ptext extends StyleMixin {
  color?: string;
  size?: number;
  font?: string;
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
}

export const Span = styled.Text<Ptext>`
  color: ${props => props.color ?? ColorPalette.dark};
  font-family: ${props => props.font ?? 'Roboto'};
  font-size: ${props => props.size ?? 14}px;
  font-weight: ${props => props.weight ?? 'normal'};
  text-align: ${props => props.align ?? 'center'};
`;

export const Bold = styled(Span)`
  font-size: ${props => props.size ?? 18}px;
  font-weight: ${props => props.weight ?? 'bold'};
`;
