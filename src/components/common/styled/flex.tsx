import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {center} from './center';

interface PFlex {
  flex: ViewStyle['flex'];
  center?: boolean;
}

const Flex = styled.View<PFlex>`
  flex: ${({flex}) => flex};
  ${({center: isCenter}) => (isCenter ? center : '')}
`;

export default Flex;
