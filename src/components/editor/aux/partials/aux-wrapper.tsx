import {
  useAuxMode,
  useFocusedBlock,
  useFocusedFunc,
} from '@src/hooks/redux-queries';
import {EditorState, setAuxMode} from '@src/redux/slices/editor';
import {update} from '@src/redux/slices/workspace';
import React from 'react';
import {ScrollView, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {batch, useDispatch} from 'react-redux';
import AuxSection from './aux-section';
import AuxDeleteButton from './delete-button';
import Hr from './hr';

/**
 *
 * @returns {ReturnType<typeof useReduxProps>}
 * @description This hook is specific to AuxWrapper component.
 */
const useReduxProps = () => {
  const dispatch = useDispatch();
  const auxMode = useAuxMode();
  const focusedFunc = useFocusedFunc();
  const focusedBlock = useFocusedBlock();
  return {
    auxMode,
    focusedFunc,
    focusedBlock,
    update: () => dispatch(update()),
    setAuxMode: (payload: EditorState['auxMode']) =>
      dispatch(setAuxMode(payload)),
  };
};

interface PDefaultFooter {
  onDelete?: () => void;
}

const DefaultFooter: React.FC<PDefaultFooter> = ({onDelete}) => {
  const dispatch = useDispatch();
  const focusedFunc = useFocusedFunc();
  const focusedBlock = useFocusedBlock();
  const onPress = () => {
    if (focusedBlock) {
      batch(() => {
        onDelete && onDelete();
        focusedFunc?.deleteBlock(focusedBlock);
        dispatch(setAuxMode('none'));
      });
    }
  };
  return (
    <AuxSection last={true}>
      <Hr />
      <AuxDeleteButton onPress={onPress} />
    </AuxSection>
  );
};

export type AuxHeader = (
  props: ReturnType<typeof useReduxProps>,
) => React.ReactElement;
export type AuxFooter = (
  props: ReturnType<typeof useReduxProps>,
) => React.ReactElement;

interface PAuxWrapper {
  renderHeader?: AuxHeader;
  renderFooter?: AuxFooter;
  children?: React.ReactNode; // IDK why error occurs on here
  onDelete?: () => void;
}

const AuxWrapper: React.FC<PAuxWrapper> = ({
  children,
  renderHeader,
  renderFooter,
  onDelete,
}) => {
  const props = useReduxProps();
  const insets = useSafeAreaInsets();
  const insetStyle: ViewStyle = {
    marginTop: insets.top + 20,
  };
  return (
    <ScrollView
      style={[styles.root, insetStyle]}
      contentContainerStyle={styles.contentContainer}>
      {renderHeader && (
        <AuxSection last={!children}>{renderHeader(props)}</AuxSection>
      )}
      {children}
      {renderFooter ? (
        <>
          <Hr />
          <AuxSection last={true}>{renderFooter(props)}</AuxSection>
        </>
      ) : (
        <DefaultFooter onDelete={onDelete} />
      )}
    </ScrollView>
  );
};

export default AuxWrapper;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
