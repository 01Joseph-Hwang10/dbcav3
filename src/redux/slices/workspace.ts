import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import {getSensorName, TSensor} from '@src/modules/block-definitions/helpers';
import {FunctionBlock} from '@src/modules/block-definitions/functions/function';
import {Nullable} from '@src/utils/types';

type WorkspaceMode = 'edit' | 'move';

export interface WorkspaceState {
  // >>> DATA >>>
  functions: FunctionBlock[];
  globalVars: VarBlock[];
  // <<< DATA <<<

  // >>> DATA STATE >>>
  focusedFuncIdx: number;
  focusedVarId: Nullable<string>;
  focusedBlockIdx: number;
  funcAutoKey: number;
  varAutoKey: number;
  // <<< DATA STATE <<<

  // >>> UI STATE >>>
  workspaceMode: WorkspaceMode;
  // <<< UI STATE <<<

  // >>> Transpiler >>>
  transpiling: boolean;
  // <<< Transpiler <<<

  // >>> UPDATER >>>
  updater: boolean;
  // <<< UPDATER <<<
}

const initialState: WorkspaceState = {
  functions: [],
  globalVars: [],
  focusedFuncIdx: 0,
  focusedVarId: null,
  focusedBlockIdx: 0,
  funcAutoKey: 1,
  varAutoKey: 1,
  workspaceMode: 'edit',
  transpiling: false,
  updater: false,
};

if (process.env.NODE_ENV !== 'test') {
  initialState.functions.push(
    new FunctionBlock({funcName: '메인', deletable: false}),
  );
}

// >>> Payload Types >>>

export type InjectSensorFuncsIn = TSensor[];

export type CreateFuncIn = Nullable<FunctionBlock>;

export type UpdateFuncIn = {
  newFunc: FunctionBlock;
  index: number;
};

export type DeleteFuncIn = number;

export type CreateVarIn = Nullable<VarBlock>;

export type UpdateVarIn = {
  newVar: VarBlock;
  id: string;
};

export type DeleteVarIn = string;

// <<< Payload Types <<<

export const {
  reducer: workspaceReducer,
  actions: {
    setFunctions,
    setGlobalVars,
    setFocusedFuncIdx,
    createFunc,
    updateFunc,
    deleteFunc,
    createGlobalVar,
    updateGlobalVar,
    deleteGlobalVar,
    injectSensorFuncs,
    setFocusedVarId,
    update,
    setFocusedBlockIdx,
    resetWorkspace,
    setTranspiling,
    setWorkspaceMode,
  },
} = createSlice({
  name: 'workspaceSlice',
  initialState,
  reducers: {
    setWorkspaceMode: (
      state,
      action: PayloadAction<WorkspaceState['workspaceMode']>,
    ) => {
      state.workspaceMode = action.payload;
    },
    setFunctions: (
      state,
      action: PayloadAction<WorkspaceState['functions']>,
    ) => {
      state.functions = action.payload;
    },
    setGlobalVars: (
      state,
      action: PayloadAction<WorkspaceState['globalVars']>,
    ) => {
      state.globalVars = action.payload;
    },
    setFocusedFuncIdx: (
      state,
      action: PayloadAction<WorkspaceState['focusedFuncIdx']>,
    ) => {
      state.focusedFuncIdx = action.payload;
    },
    createFunc: (state, action: PayloadAction<CreateFuncIn>) => {
      state.functions.push(
        action.payload ??
          new FunctionBlock({
            funcName: `fn${state.funcAutoKey}`,
          }),
      );
      state.funcAutoKey++;
    },
    updateFunc: (state, action: PayloadAction<UpdateFuncIn>) => {
      const {newFunc, index} = action.payload;
      state.functions[index] = newFunc;
    },
    deleteFunc: (state, action: PayloadAction<DeleteFuncIn>) => {
      const index = action.payload;
      if (index < 0) return;
      state.functions.splice(index, 1);
      if (state.functions.length === 0) {
        state.focusedFuncIdx = -1;
      } else {
        state.focusedFuncIdx = Math.min(
          state.focusedFuncIdx,
          state.functions.length - 1,
        );
      }
    },
    createGlobalVar: (state, action: PayloadAction<CreateVarIn>) => {
      state.globalVars.push(
        action.payload ??
          new VarBlock({
            varName: `x${state.varAutoKey}`,
            varType: 'global',
            funcRef: null,
          }),
      );
      state.varAutoKey++;
    },
    updateGlobalVar: (state, action: PayloadAction<UpdateVarIn>) => {
      const {newVar, id} = action.payload;
      const index = state.globalVars.findIndex(
        globalVar => globalVar.id === id,
      );
      if (index >= 0) {
        state.globalVars[index] = newVar;
      }
    },
    deleteGlobalVar: (state, action: PayloadAction<DeleteVarIn>) => {
      const id = action.payload;
      const index = state.globalVars.findIndex(
        globalVar => globalVar.id === id,
      );
      if (index >= 0) {
        state.globalVars.splice(index, 1);
        if (state.globalVars.length === 0) {
          state.focusedVarId = null;
        } else {
          state.focusedVarId =
            state.globalVars[Math.min(index, state.globalVars.length - 1)].id;
        }
      }
    },
    injectSensorFuncs: (state, action: PayloadAction<InjectSensorFuncsIn>) => {
      const sensors = action.payload;
      state.functions = state.functions.filter(func => !func.isSensor());
      state.functions.push(
        ...sensors.reduce((acc, cur) => {
          const funcName = getSensorName(cur);
          if (funcName) {
            acc.push(
              new FunctionBlock({
                funcName,
              }),
            );
          }
          return acc;
        }, [] as FunctionBlock[]),
      );

      state.globalVars = state.globalVars.filter(
        variable => !variable.isSensor,
      );
      state.globalVars.push(
        ...sensors.reduce((acc, cur) => {
          const varName = getSensorName(cur);
          if (varName) {
            acc.push(
              new VarBlock({
                varName: varName,
                value: null,
                isSensor: true,
                funcRef: null,
                varType: 'global',
              }),
            );
          }
          return acc;
        }, [] as VarBlock[]),
      );
    },
    setFocusedVarId: (
      state,
      action: PayloadAction<WorkspaceState['focusedVarId']>,
    ) => {
      state.focusedVarId = action.payload;
    },
    update: state => {
      state.updater = !state.updater;
    },
    setFocusedBlockIdx: (
      state,
      action: PayloadAction<WorkspaceState['focusedBlockIdx']>,
    ) => {
      state.focusedBlockIdx = action.payload;
    },
    resetWorkspace: state => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
    setTranspiling: (
      state,
      action: PayloadAction<WorkspaceState['transpiling']>,
    ) => {
      state.transpiling = action.payload;
    },
  },
});
