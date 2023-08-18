import Center from '@src/components/common/styled/center';
import {SwitchCtxProvider} from '@src/context/switch';
import {useFocusedFunc} from '@src/hooks/redux-queries';
import {getFocusedFunc} from '@src/redux/queries/workspace';
import {ColorPalette} from '@src/themes/colors';
import {Nullable} from '@src/utils/types';
import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import AddIcon from '../icons/add-button';
import GridBlock from './grid-block';
import {
  gridBlockSize,
  gridBorderColor,
  gridBorderRadius,
  gridBorderWidth,
  gridSize,
} from './grid.utils';

interface PGridRow {
  tight?: boolean;
  marginTop?: Nullable<number>;
  marginBottom?: Nullable<number>;
}

const GridRow = styled(Center)<PGridRow>`
  flex-direction: row;
  width: 100%;
  ${({tight}) => (!tight ? `height: ${gridBlockSize}px;` : '')};
  ${({marginTop}) => (marginTop ? `margin-top: ${marginTop}px;` : '')};
  ${({marginBottom}) =>
    marginBottom ? `margin-bottom: ${marginBottom}px;` : ''};
`;

const AddButton = styled(AddIcon)`
  border-radius: ${gridBorderRadius}px;
  border-color: ${gridBorderColor};
  border-width: ${gridBorderWidth}px;
  width: ${gridSize}px;
`;

const AddBlockButton: React.FC = () => {
  const focusedFunc = useFocusedFunc();
  const onPress = () => {
    focusedFunc?.addBlockSpaces();
  };
  return <AddButton onPress={onPress} iconColor={ColorPalette.teal} />;
};

/**
 *
 * @returns {React.ReactNode}
 * @todo Need to change current layout
 *       If it is class -> Do as current
 *       If it is function -> Do as current, but layout is like below and it is endless
 *         [ ] ▶ [ ] ▶ [ ]
 *       ▶ [ ] ▶ [ ] ▶ [ ]
 *       ▶ [ ] ▶ [ ] ▶ [ ]
 *       ▶ [ ] ▶ [ ] ▶ [ ]
 *       ...
 *       Where there's no gap between [ ] and ▶ is overlayed over [ ]'s vertical border,
 *       excluding first column, which will be slightly different than 2nd and 3rd column of caret,
 *       and not overlayed over border.
 */
const Grid = () => {
  const [focused, setFocused] = useState(false);
  const rowCount = useSelector((state: RootState) =>
    Math.floor(Math.max(getFocusedFunc(state)?.blocks.length ?? 0, 9) / 3),
  );

  return (
    <SwitchCtxProvider value={[focused, setFocused]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {new Array(rowCount)
          .fill(null)
          .map((_, index) => index + 1)
          .map(rowNumber => (
            <GridRow key={rowNumber} marginTop={rowNumber === 1 ? 50 : null}>
              <GridBlock order={3 * rowNumber - 2} />
              <GridBlock order={3 * rowNumber - 1} />
              <GridBlock order={3 * rowNumber} />
            </GridRow>
          ))}
        <GridRow tight={true} marginBottom={10}>
          <AddBlockButton />
        </GridRow>
      </ScrollView>
    </SwitchCtxProvider>
  );
};

export default Grid;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
