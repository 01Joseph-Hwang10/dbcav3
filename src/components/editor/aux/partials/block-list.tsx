import ListView, {ListViewItem} from '@src/components/common/lists/list-view';
import Center from '@src/components/common/styled/center';
import {Span} from '@src/components/common/styled/text';
import {
  useAuxMode,
  useFocusedBlockIdx,
  useFocusedFunc,
} from '@src/hooks/redux-queries';
import {BlockName} from '@src/modules/block-definitions/base/base';
import {setAuxMode} from '@src/redux/slices/editor';
import {ColorPalette} from '@src/themes/colors';
import {APP_MODE} from '@src/utils/config';
import {Nullable} from '@src/utils/types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {batch, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {getBlockTheme} from '../../workspace/grid.utils';

const miniBlockSize = 50;

interface PSquircle {
  theme: [Nullable<string>, Nullable<string>];
  focused: boolean;
}

const Squircle = styled(Center)<PSquircle>`
  width: ${miniBlockSize}px;
  height: ${miniBlockSize}px;
  border-radius: 10px;
  border-width: 2.5px;
  background-color: ${({theme}) => theme[0]}; // primary color
  border-color: ${({theme, focused}) =>
    focused
      ? theme[1] ?? ColorPalette.transparent
      : theme[0] ?? ColorPalette.transparent}; // secondary color when focused
`;

interface PMiniBlock {
  blockName: BlockName;
}

const MiniBlock: React.FC<PMiniBlock> = ({blockName}) => {
  const theme = getBlockTheme(blockName);
  const auxMode = useAuxMode();
  const focusedBlockIdx = useFocusedBlockIdx();
  const focusedFunc = useFocusedFunc();
  const dispatch = useDispatch();
  const focused = blockName === auxMode;
  const onPress = () => {
    batch(() => {
      dispatch(setAuxMode(blockName));
      focusedFunc?.insertBlockByBlockName(blockName, focusedBlockIdx);
    });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Squircle theme={theme} focused={focused}>
        <Span size={18} numberOfLines={1}>
          {blockName}
        </Span>
      </Squircle>
    </TouchableOpacity>
  );
};

const renderItem: ListViewItem<BlockName> = ({item: blockName}) => {
  return <MiniBlock blockName={blockName} />;
};

const keyExtractor = (_: BlockName, index: number) => `blockName${index}`;

interface PAuxHeaderBlockList {
  blockNames: BlockName[];
}

const Header = styled(Center)`
  width: 100%;
  padding: 10px 0px;
  flex: 1;
  flex-direction: row;
`;

const AuxHeaderBlockList: React.FC<PAuxHeaderBlockList> = ({blockNames}) => {
  return (
    <Header>
      <ListView
        horizontal={true}
        style={styles.flexList}
        data={blockNames}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Header>
  );
};

export default AuxHeaderBlockList;

export const ConditionBlockList: React.FC = () => {
  return (
    <>
      <AuxHeaderBlockList blockNames={['if', 'for']} />
      <AuxHeaderBlockList blockNames={['while', 'end']} />
    </>
  );
};

export const DroneBlockList: React.FC = () => {
  return (
    <AuxHeaderBlockList
      blockNames={[APP_MODE === 'mod1' ? 'control' : 'motor', 'wait']}
    />
  );
};

export const AllBlockList: React.FC = () => {
  return (
    <>
      <AuxHeaderBlockList blockNames={['if', 'for']} />
      <AuxHeaderBlockList blockNames={['while', 'end']} />
      <AuxHeaderBlockList
        blockNames={[APP_MODE === 'mod1' ? 'control' : 'motor', 'wait']}
      />
      <AuxHeaderBlockList blockNames={['assign', 'function']} />
    </>
  );
};

const styles = StyleSheet.create({
  flexList: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
