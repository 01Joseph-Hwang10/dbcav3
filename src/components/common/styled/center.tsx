import styled, {css} from 'styled-components/native';

interface PCenter {
  fill?: boolean;
}

export const center = css`
  justify-content: center;
  align-items: center;
`;

const Center = styled.View<PCenter>`
  ${({fill}) => (fill ? 'flex: 1;' : '')}
  ${({fill}) => (fill ? 'width: 100%;' : '')}
  ${({fill}) => (fill ? 'height: 100%;' : '')}
  ${center}
`;

export default Center;
