import React from 'react';
import AuxSection from '../partials/aux-section';
import AuxWrapper, {AuxHeader} from '../partials/aux-wrapper';
import {ConditionBlockList} from '../partials/block-list';
import {IfBlock} from '@src/modules/block-definitions/functions/blocks/if';
import CompareRowIf from './compare-row-if';
import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import {Condition} from '@src/modules/block-definitions/functions/blocks/condition';
import {useUpdater} from '@src/hooks/useUpdater';
import {Bold} from '@src/components/common/styled/text';
import {WhileBlock} from '@src/modules/block-definitions/functions/blocks/while';
import {useFocusedBlock} from '@src/hooks/redux-queries';

const renderHeader: AuxHeader = () => {
  return <ConditionBlockList />;
};

const renderItem: ListViewItem<Condition> = ({item: condition, index}) => {
  return <CompareRowIf condition={condition} rowIdx={index} />;
};

const keyExtractor = (_: Condition, index: number) => `auxC${index}`;

/**
 *
 * @description This component is used to render the aux of both If and While blocks.
 */
export const AuxConditional: React.FC = () => {
  useUpdater();
  const focusedBlock = useFocusedBlock<IfBlock | WhileBlock>();
  const conditions = focusedBlock?.conditions ?? [];
  return (
    <AuxWrapper renderHeader={renderHeader}>
      <AuxSection last={true}>
        <Bold>조건</Bold>
        <ListView
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={conditions}
        />
      </AuxSection>
    </AuxWrapper>
  );
};
