import styled, {css} from 'styled-components/native';

interface PFill {
  center?: boolean;
}

export const fill = css`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Fill = styled.View<PFill>`
  flex: 1;
  width: 100%;
  height: 100%;
  ${({center}) =>
    center ? 'justify-content: center; align-items: center;' : ''}
`;

export default Fill;
