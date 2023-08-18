import {AAbstractBlock, AbstractBlock, BlockName} from '../../base/base';
import {FunctionBlock} from '../function';
import {processFuncRef} from '../../helpers';
import {Condition, ConditionalBlock} from './condition';

abstract class AWhileBlock extends AAbstractBlock {
  abstract conditions: Condition[];
}

export class WhileBlock
  extends AbstractBlock
  implements AWhileBlock, ConditionalBlock
{
  constructor(ref: string | FunctionBlock, options?: Partial<AWhileBlock>) {
    super(options?.funcRef ?? processFuncRef(ref), options?.id);
    this.conditions = options?.conditions ?? [
      new Condition({blockRef: this.id, funcRef: this.funcRef!}),
    ];
  }

  name: BlockName = 'while';
  conditions: Condition[];

  createCondition(condition?: Condition) {
    this.actionChain(() => {
      if (condition) {
        this.conditions.push(condition);
      } else {
        this.conditions.push(
          new Condition({blockRef: this.id, funcRef: this.funcRef!}),
        );
      }
    });
  }

  private findConditionIndexById(id: string): number {
    const index = this.conditions.findIndex(condition => condition.id === id);
    if (index < 0) {
      return 0; // Needs error handling
    }
    return index;
  }

  updateCondition(newCondition: Condition) {
    this.actionChain(() => {
      const index = this.findConditionIndexById(newCondition.id);
      this.conditions[index] = newCondition;
    });
  }

  deleteCondition(condition: Condition | string) {
    this.actionChain(() => {
      const index = this.findConditionIndexById(
        typeof condition === 'string' ? condition : condition.id,
      );
      this.conditions.splice(index, 1);
    });
  }

  actionChain(actions: () => void) {
    actions();
    this.funcRef!.refFunc?.setBlock(this);
  }
}
