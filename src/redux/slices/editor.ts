import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BlockName} from '@src/modules/block-definitions/base/base';
import {Nullable} from '@src/utils/types';

export type PaletteMode = 'files' | 'variables' | 'options';
export type AuxMode = 'none' | BlockName;
export type OptionScope =
  | 'compare' // 비교 연산자
  | 'variable' // 변수만
  | 'calculation' // 숫자 연산자
  | 'function' // 함수
  | 'raw' // 사용자 입력
  | 'null' // null
  | 'flow!' // break + continue + blockNumber + function
  | '!sensor' // 센서 제외
  | 'iterator'; // iterator

export interface EditorState {
  // >>> UI STATE >>>
  focusedButtonId: Nullable<string>;
  paletteMode: PaletteMode;
  auxMode: AuxMode;
  optionMode: OptionScope[];
  inputOpened: boolean;
  // <<< UI STATE <<<
}

const initialState: EditorState = {
  paletteMode: 'files',
  auxMode: 'none',
  optionMode: [],
  inputOpened: false,
  focusedButtonId: null,
};

export const {
  reducer: editorReducer,
  actions: {
    setAuxMode,
    setPaletteMode,
    setOptionMode,
    setInputOpened,
    resetEditor,
    setFocusedButtonId,
  },
} = createSlice({
  name: 'editorSlice',
  initialState,
  reducers: {
    setPaletteMode: (
      state,
      action: PayloadAction<EditorState['paletteMode']>,
    ) => {
      state.paletteMode = action.payload;
    },
    setAuxMode: (state, action: PayloadAction<EditorState['auxMode']>) => {
      state.auxMode = action.payload;
    },
    setOptionMode: (
      state,
      action: PayloadAction<EditorState['optionMode']>,
    ) => {
      state.optionMode = action.payload;
    },
    setInputOpened: (
      state,
      action: PayloadAction<EditorState['inputOpened']>,
    ) => {
      state.inputOpened = action.payload;
    },
    resetEditor: state => {
      state = initialState; // eslint-disable-line @typescript-eslint/no-unused-vars
    },
    setFocusedButtonId: (
      state,
      action: PayloadAction<EditorState['focusedButtonId']>,
    ) => {
      state.focusedButtonId = action.payload;
    },
  },
});
