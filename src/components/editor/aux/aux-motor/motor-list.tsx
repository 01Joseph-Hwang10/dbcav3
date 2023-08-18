import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import {
  MotorBlock,
  MotorDatum,
} from '@src/modules/block-definitions/functions/blocks/motor';
import React from 'react';
import MotorRow from './motor-row';
import Placeholder from '@src/components/common/placeholder';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import {useUpdater} from '@src/hooks/useUpdater';

const renderItem: ListViewItem<MotorDatum> = ({item: motorDatum, index}) => {
  return <MotorRow motorDatum={motorDatum} rowIdx={index} />;
};

const ListEmptyComponent = () => <Placeholder text="모터 없음" />;

const MotorList: React.FC = () => {
  useUpdater();
  const focusedBlock = useFocusedBlock<MotorBlock>();
  const motors = focusedBlock?.motors ?? [];
  return (
    <ListView
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
      data={motors}
    />
  );
};

export default MotorList;
