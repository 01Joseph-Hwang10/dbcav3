import {getFocusedFunc} from '@src/redux/queries/workspace';
import {update} from '@src/redux/slices/workspace';
import store from '@src/redux/store';
import {Nullable} from '@src/utils/types';
import {v1 as uuidv1} from 'uuid';
import {FuncRef} from '../functions/func-ref';
import {VarRef} from '../variables/var-ref';

type Keyword = 'iterator';
export type BlockVariable = VarRef | number | Keyword;

export type BlockName =
  | 'if'
  | 'for'
  | 'end'
  | 'assign'
  | 'motor'
  | 'control'
  // | 'break'
  // | 'continue'
  | 'function'
  | 'variable'
  | 'config'
  | 'wait'
  | 'while';

export type ActionChain = (actions: () => void) => void;

interface IAbstractBlock {
  actionChain: ActionChain;
}

export abstract class AAbstractBlock {
  abstract name: BlockName;
  abstract id: string;
  abstract funcRef: Nullable<FuncRef>;
}

export abstract class AbstractBlock
  extends AAbstractBlock
  implements IAbstractBlock
{
  id: string;
  /**
   * @description If null, it means it is just a function refernce, not a block
   *              This does stopping recursive assignment
   *              In variable case, if GLOBAL, then it is a global variable
   */
  funcRef: Nullable<FuncRef>;

  constructor(ref?: string | FuncRef, id?: string) {
    super();
    this.id = id ?? uuidv1();
    if (typeof ref === 'string') {
      this.funcRef = new FuncRef(ref);
      return;
    }
    this.funcRef = ref;
  }

  get blockIdx(): number {
    const focusedFunc = getFocusedFunc(store.state);
    if (!focusedFunc) {
      throw new Error('No focused function');
    }
    return focusedFunc.blocks.findIndex(block => block?.id === this.id);
  }

  isFocused(): boolean {
    const {
      workspace: {focusedBlockIdx},
    } = store.state;
    if (focusedBlockIdx === this?.blockIdx) {
      return true;
    }
    return false;
  }

  update() {
    store.dispatch(update());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  actionChain(actions: () => void) {}
}
