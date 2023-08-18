import {AbstractBlock, BlockName} from '../../base/base';
import {FuncRef} from '../func-ref';

export class EndBlock extends AbstractBlock {
  name: BlockName = 'end';

  constructor(ref?: string | FuncRef) {
    super(ref);
  }
}
