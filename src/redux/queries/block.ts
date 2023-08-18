import {KeywordBlock} from '@src/modules/block-definitions/block';
import {FunctionBlock} from '@src/modules/block-definitions/functions/function';
import {Nullable} from '@src/utils/types';
import store from '../store';

export const getCurrentBlockIdx = (
  currentBlock: KeywordBlock,
  funcId: string,
): number => {
  const currentFunc = store.state.workspace.functions.find(
    func => func.id === funcId,
  );
  const index = currentFunc?.blocks.findIndex(
    block => block && block.id === currentBlock.id,
  );
  return index ?? -1;
};

export const getFunction = (id: string): Nullable<FunctionBlock> => {
  return store.state.workspace.functions.find(func => func.id === id);
};
