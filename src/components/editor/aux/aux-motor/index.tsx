import React from 'react';
import MotorList from './motor-list';
import AuxSection from '../partials/aux-section';
import AuxWrapper, {AuxHeader} from '../partials/aux-wrapper';
import {DroneBlockList} from '../partials/block-list';

const renderHeader: AuxHeader = () => {
  return <DroneBlockList />;
};

const AuxMotor: React.FC = () => {
  return (
    <AuxWrapper renderHeader={renderHeader}>
      <AuxSection last={true}>
        <MotorList />
      </AuxSection>
    </AuxWrapper>
  );
};

export default AuxMotor;
