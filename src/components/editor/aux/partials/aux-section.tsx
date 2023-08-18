import Hr from '@src/components/editor/aux/partials/hr';
import {StyleMixin} from '@src/utils/types';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

interface PAuxSection extends StyleMixin {
  last?: boolean;
}

const AuxSection: React.FC<PAuxSection> = ({style, children, last}) => {
  return (
    <>
      <Container style={style}>{children}</Container>
      {!last && <Hr />}
    </>
  );
};

export default AuxSection;
