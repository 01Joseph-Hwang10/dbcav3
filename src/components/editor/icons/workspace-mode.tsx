import FAB from '@src/components/common/button/fab';
import {setWorkspaceMode} from '@src/redux/slices/workspace';
import {ColorPalette} from '@src/themes/colors';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';

const WorkspaceModeButton = () => {
  const dispatch = useDispatch();
  const workspaceMode = useSelector(
    (state: RootState) => state.workspace.workspaceMode,
  );
  const onPress = () => {
    if (workspaceMode === 'edit') {
      dispatch(setWorkspaceMode('move'));
    } else {
      dispatch(setWorkspaceMode('edit'));
    }
  };
  return (
    <FAB size={30} onPress={onPress} backgroundColor={ColorPalette.teal}>
      <Feather name="move" size={30} color={ColorPalette.black} />
    </FAB>
  );
};

export default WorkspaceModeButton;
