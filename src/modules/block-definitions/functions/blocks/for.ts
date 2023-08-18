import {Nullable} from '@src/utils/types';
import {AAbstractBlock, AbstractBlock, BlockName} from '../../base/base';
import {FunctionBlock} from '../function';
import {processFuncRef} from '../../helpers';
import {VarRef} from '../../variables/var-ref';
import {CallFunctionBlock} from './call-function';

abstract class AForBlock extends AAbstractBlock {
  abstract loopCount: number | VarRef;
  /**
   * @deprecated This attribute is not used anymore since our languate (Rabbit) now follows ruby syntax.
   */
  abstract body: Nullable<CallFunctionBlock>;
}

export class ForBlock extends AbstractBlock implements AForBlock {
  constructor(ref: string | FunctionBlock, options?: Partial<AForBlock>) {
    super(options?.funcRef ?? processFuncRef(ref), options?.id);
    this.loopCount = options?.loopCount ?? 3;
    this.body = options?.body ?? null;
  }

  name: BlockName = 'for';
  loopCount: number | VarRef;
  /**
   * @deprecated This attribute is not used anymore since our languate (Rabbit) now follows ruby syntax.
   */
  body: Nullable<CallFunctionBlock>;

  setLoopCount(count: number | VarRef) {
    this.actionChain(() => {
      this.loopCount = count;
    });
  }

  /**
   * @deprecated This method is not used anymore since our languate (Rabbit) now follows ruby syntax.
   */
  setBody(func: CallFunctionBlock) {
    this.actionChain(() => {
      this.body = func;
      this.body.setActionChain(this.actionChain);
    });
  }

  actionChain(actions: () => void) {
    actions();
    this.funcRef!.refFunc?.setBlock(this);
  }
}
