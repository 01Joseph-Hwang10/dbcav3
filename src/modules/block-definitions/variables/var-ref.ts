import store from '@src/redux/store';
import {Nullable} from '@src/utils/types';
import {AAbstractBlock, AbstractBlock, BlockName} from '../base/base';
import {VarBlock} from './variable';
import {getVariables} from '@src/redux/queries/workspace';

const GLOBAL = 'global';

abstract class AVarRef extends AAbstractBlock {
  abstract ref: string;
}

export class VarRef extends AbstractBlock implements AVarRef {
  ref: string;
  name: BlockName = 'variable';

  constructor(ref: string | VarBlock, options?: Partial<AVarRef>) {
    super(options?.funcRef ?? GLOBAL, options?.id);
    if (typeof ref === 'string') {
      this.ref = ref;
    } else {
      this.ref = ref.id;
    }
  }

  private findRef(): Nullable<VarBlock> {
    const ref = this.ref;
    const variables = getVariables(store.state);
    const refVar = variables.find(variable => variable.id === ref);
    return refVar;
  }

  get refVar(): Nullable<VarBlock> {
    return this.findRef();
  }

  get varName(): string {
    return this.findRef()?.varName ?? '<No Reference Variable>';
  }
}
