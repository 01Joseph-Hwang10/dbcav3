import React from 'react';
import AuxWrapper, {AuxHeader} from './partials/aux-wrapper';
import {ConditionBlockList} from './partials/block-list';

const renderHeader: AuxHeader = () => {
  return <ConditionBlockList />;
};

const AuxEnd: React.FC = () => {
  return <AuxWrapper renderHeader={renderHeader} />;
};

export default AuxEnd;
