import {FunctionBlock} from '@src/modules/block-definitions/functions/function';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FunctionItem from './function-item';
import AddIcon from '../icons/add-button';
import PaletteWrapper from './parials/palette-wrapper';
import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import {createFunc} from '@src/redux/slices/workspace';
import {useUpdater} from '@src/hooks/useUpdater';

const renderItem: ListViewItem<FunctionBlock> = ({item: func, index}) => {
  return <FunctionItem func={func} funcIdx={index} />;
};

const keyExtractor = (_: FunctionBlock, index: number) => `function${index}`;

const ListFooterComponent: React.FC = () => {
  const dispatch = useDispatch();
  const onPress = () => dispatch(createFunc());
  return <AddIcon onPress={onPress} />;
};

const FunctionList: React.FC = () => {
  useUpdater();
  const functions = useSelector(
    (state: RootState) => state.workspace.functions,
  );
  return (
    <PaletteWrapper>
      <ListView
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        data={functions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={ListFooterComponent}
      />
    </PaletteWrapper>
  );
};

export default FunctionList;

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
