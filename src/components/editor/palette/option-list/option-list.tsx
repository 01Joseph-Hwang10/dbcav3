import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PaletteWrapper from '../parials/palette-wrapper';
import {OptionItem} from './option-list.utils';
import OptionItemComponent from './option-item';
import {getOptions} from '@src/redux/queries/options';
import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import Placeholder from '@src/components/common/placeholder';
import Fallback from '@src/components/common/utilities/fallback';

const renderItem: ListViewItem<OptionItem> = ({item: option}) => (
  <OptionItemComponent option={option} />
);

const keyExtractor = (_: OptionItem, index: number) => `optionItem${index}`;

const OptionList: React.FC = () => {
  const options = useSelector((state: RootState) => getOptions(state));
  return (
    <PaletteWrapper>
      <Fallback
        fallbackCondition={options.length === 0}
        onFallback={<Placeholder text="사용 가능한 옵션 없음" />}>
        <ListView
          style={styles.flatList}
          contentContainerStyle={styles.contentContainer}
          data={options}
          renderItem={renderItem}
          scrollable={true}
          keyExtractor={keyExtractor}
        />
      </Fallback>
    </PaletteWrapper>
  );
};

export default OptionList;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
});
