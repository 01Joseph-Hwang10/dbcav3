import {
  AuxMode,
  EditorState,
  PaletteMode,
  setAuxMode,
  setPaletteMode,
} from '@src/redux/slices/editor';
import {setFocusedFuncIdx, WorkspaceState} from '@src/redux/slices/workspace';
import {ColorPalette} from '@src/themes/colors';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';

export const paletteFocused = (
  mode: PaletteMode,
  target: PaletteMode,
): string => (mode === target ? ColorPalette.gold : ColorPalette.black);

export const auxFocused = (mode: AuxMode, target: AuxMode[]): string =>
  target.includes(mode) ? ColorPalette.orange : ColorPalette.black;

export const iconSize = 36;

export const smallIconSize = iconSize * 0.66;

const sp = (state: RootState) => ({
  paletteMode: state.editor.paletteMode,
  auxMode: state.editor.auxMode,
  focusedBlockIdx: state.workspace.focusedBlockIdx,
  focusedFuncIdx: state.workspace.focusedFuncIdx,
  functions: state.workspace.functions,
});

const dp = (dispatch: Dispatch) => ({
  setPaletteMode: (payload: EditorState['paletteMode']) =>
    dispatch(setPaletteMode(payload)),
  setAuxMode: (payload: EditorState['auxMode']) =>
    dispatch(setAuxMode(payload)),
  setFocusedBlockIdx: (payload: WorkspaceState['focusedBlockIdx']) =>
    dispatch(setFocusedFuncIdx(payload)),
});

export const cIcon = connect(sp, dp);

export type RPIcons = ConnectedProps<typeof cIcon>;
