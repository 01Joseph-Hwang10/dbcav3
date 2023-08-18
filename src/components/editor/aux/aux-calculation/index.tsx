import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import {
  AssignBlock,
  Assignment,
} from '@src/modules/block-definitions/functions/blocks/assign';
import {st} from '@src/themes/styles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AssignmentRow from './assignment-row';
import AuxCalculationListFooter from './list-footer';
import AuxSection from '../partials/aux-section';
import AuxWrapper from '../partials/aux-wrapper';
import Label from '../partials/label';
import {useFocusedBlock} from '@src/hooks/redux-queries';
import {useUpdater} from '@src/hooks/useUpdater';

const renderItem: ListViewItem<Assignment> = ({item: assignment, index}) => {
  return <AssignmentRow assignment={assignment} rowIdx={index} />;
};

const keyExtractor = (_: Assignment, index: number) => `assignRow${index}`;

const AuxCalculation: React.FC = () => {
  useUpdater();
  const focusedBlock = useFocusedBlock<AssignBlock>();
  const assignments = focusedBlock?.assignments;
  return (
    <AuxWrapper>
      <AuxSection last={true}>
        <View style={[styles.header, st.center]}>
          <Label value="계산" />
        </View>
        <ListView
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          data={assignments ?? []}
          ListFooterComponent={AuxCalculationListFooter}
        />
      </AuxSection>
    </AuxWrapper>
  );
};

export default AuxCalculation;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
});
