import {KeywordBlock} from '@src/modules/block-definitions/block';
import {FunctionBlock} from '@src/modules/block-definitions/functions/function';
import {VarBlock} from '@src/modules/block-definitions/variables/variable';
import {Nullable} from '@src/utils/types';

export const getFocusedFunc = ({
  workspace: {focusedFuncIdx, functions},
}: RootState): Nullable<FunctionBlock> => {
  if (focusedFuncIdx < 0) {
    return null;
  }
  return functions[focusedFuncIdx];
};

export const getInputVariables = (state: RootState): VarBlock[] => {
  const {
    workspace: {functions, focusedFuncIdx},
  } = state;
  if (focusedFuncIdx < 0) {
    return [];
  }
  return functions[focusedFuncIdx].config.inputVars;
};

export const getLocalVariables = (state: RootState): VarBlock[] => {
  const {
    workspace: {functions, focusedFuncIdx},
  } = state;
  if (focusedFuncIdx < 0) {
    return [];
  }
  return functions[focusedFuncIdx].localVars;
};

const getAllVariables = (state: RootState): VarBlock[] => {
  const {
    workspace: {globalVars, functions},
  } = state;
  return [
    ...globalVars,
    ...functions
      .map(func => [
        ...func.localVars,
        ...func.inputVars,
        ...func.config.inputVars,
      ])
      .flat(),
  ];
};

const getScopedVariables = (state: RootState): VarBlock[] => {
  const {
    workspace: {globalVars, focusedFuncIdx},
  } = state;
  if (focusedFuncIdx < 0) {
    return globalVars;
  }
  return [
    ...globalVars,
    ...getLocalVariables(state),
    ...getInputVariables(state),
  ];
};

export const getVariables = (state: RootState): VarBlock[] => {
  const transpiling = state.workspace.transpiling;
  if (transpiling) {
    return getAllVariables(state);
  } else {
    return getScopedVariables(state);
  }
};

export const getFocusedVar = (state: RootState): Nullable<VarBlock> => {
  const {
    workspace: {focusedVarId},
  } = state;
  if (!focusedVarId) {
    return null;
  }
  const variables = getVariables(state);
  const focusedVar = variables.find(variable => variable.id === focusedVarId);
  return focusedVar;
};

export const getFocusedBlock = (state: RootState): Nullable<KeywordBlock> => {
  const {
    workspace: {focusedBlockIdx},
  } = state;
  const focusedFunc = getFocusedFunc(state);
  if (focusedFunc) {
    return focusedFunc.blocks[focusedBlockIdx];
  }
  return null;
};
