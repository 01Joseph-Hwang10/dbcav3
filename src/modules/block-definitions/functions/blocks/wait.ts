import {AAbstractBlock, AbstractBlock, BlockName} from '../../base/base';
import {FunctionBlock} from '../function';
import {processFuncRef} from '../../helpers';
import {VarRef} from '../../variables/var-ref';

interface AWaitBlock extends AAbstractBlock {
  name: BlockName;
  /**
   * @description ms
   */
  value: VarRef | number;
}

export class WaitBlock extends AbstractBlock implements AWaitBlock {
  constructor(ref: string | FunctionBlock, options?: Partial<AWaitBlock>) {
    super(options?.funcRef ?? processFuncRef(ref), options?.id);
    this.value = options?.value ?? 1000;
  }

  name: BlockName = 'wait';
  value: number | VarRef;

  setWaitFor(waitFor: number | VarRef) {
    this.actionChain(() => {
      this.value = waitFor;
    });
  }

  actionChain(actions: () => void) {
    actions();
    this.funcRef!.refFunc?.setBlock(this);
  }
}
