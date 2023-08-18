import {useUpdater} from '@src/hooks/useUpdater';
import {switchHandler} from '@src/tools/handlers';
import React from 'react';
import {Platform} from 'react-native';
import LoopCountButton from './loop-count-button';
import AuxSection from '../partials/aux-section';
import AuxWrapper, {AuxHeader} from '../partials/aux-wrapper';
import {ConditionBlockList} from '../partials/block-list';
import Label from '../partials/label';
import Flex from '@src/components/common/styled/flex';
import styled from 'styled-components/native';

const LoopCountSection = styled(AuxSection)`
  width: 100%;
  flex-direction: row;
  padding-right: ${switchHandler(Platform.OS === 'android', 10, 0)}px;
`;

const renderHeader: AuxHeader = () => <ConditionBlockList />;

const AuxFor: React.FC = () => {
  useUpdater();
  return (
    <AuxWrapper renderHeader={renderHeader}>
      <LoopCountSection last={true}>
        <Flex flex={2}>
          <Label value="반복 횟수" />
        </Flex>
        <Flex flex={1}>
          <LoopCountButton />
        </Flex>
      </LoopCountSection>
    </AuxWrapper>
  );
};

export default AuxFor;
