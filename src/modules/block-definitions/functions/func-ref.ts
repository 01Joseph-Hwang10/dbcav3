import store from '@src/redux/store';
import {Nullable} from '@src/utils/types';
import {AAbstractBlock, BlockName} from '../base/base';
import {FunctionBlock} from './function';

abstract class AFuncRef implements Omit<AAbstractBlock, 'funcRef' | 'id'> {
  abstract name: BlockName;
  abstract ref: string;
}

export class FuncRef implements AFuncRef {
  /**
   * @description Function reference that is connected to
   */
  ref: string;
  name: BlockName = 'function';

  constructor(ref: string | FunctionBlock) {
    if (typeof ref === 'string') {
      this.ref = ref;
    } else {
      this.ref = ref.id;
    }
  }

  private findRef(): Nullable<FunctionBlock> {
    const ref = this.ref;
    if (ref) {
      return store.state.workspace.functions.find(f => f.id === ref);
    }
    return null;
  }

  get refFunc(): Nullable<FunctionBlock> {
    return this.findRef();
  }

  get funcName(): string {
    return this.findRef()?.funcName ?? '<Function Name Not Found>';
  }
}
