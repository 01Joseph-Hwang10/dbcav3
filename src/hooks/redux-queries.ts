import {KeywordBlock} from '@src/modules/block-definitions/block';
import {getFocusedBlock, getFocusedFunc} from '@src/redux/queries/workspace';
import {useSelector} from 'react-redux';

export const useFocusedFunc = () => {
  return useSelector((state: RootState) => getFocusedFunc(state));
};

export function useFocusedBlock<T extends KeywordBlock = KeywordBlock>() {
  return useSelector((state: RootState) => getFocusedBlock(state)) as T;
}

export const useFocusedBlockIdx = () => {
  return useSelector((state: RootState) => state.workspace.focusedBlockIdx);
};

export const useAuxMode = () => {
  return useSelector((state: RootState) => state.editor.auxMode);
};
