import Center from '@src/components/common/styled/center';
import React from 'react';
import styled from 'styled-components/native';
import AugmentAssign from '../icons/augment-assign';
import AugmentDrone from '../icons/augment-drone';
import AugmentFlow from '../icons/augment-flow';
import AugmentFunction from '../icons/augment-function';

const Wrapper = styled(Center)`
  position: absolute;
`;

const AugmentButtons: React.FC = () => {
  return (
    <Wrapper>
      <AugmentFlow />
      <AugmentFunction />
      <AugmentAssign />
      <AugmentDrone />
    </Wrapper>
  );
};

export default AugmentButtons;
