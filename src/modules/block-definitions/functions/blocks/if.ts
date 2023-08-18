import {Nullable} from '@src/utils/types';
import {AAbstractBlock, AbstractBlock, BlockName} from '../../base/base';
import {FunctionBlock} from '../function';
import {processFuncRef} from '../../helpers';
import {CallFunctionBlock} from './call-function';
import {Condition, ConditionalBlock} from './condition';

/**
 * @deprecated Currently flow is not used since the Rabbit language is following ruby syntax
 */
export type FlowType = 'break' | 'continue' | 'function' | 'block';

interface IFlow {
  type: FlowType;
  callbackBlock?: Nullable<CallFunctionBlock>;
  blockNumber?: number;
}

/**
 * @deprecated Currently flow is not used since the Rabbit language is following ruby syntax
 */
export class Flow implements IFlow {
  type: FlowType;
  callbackBlock?: Nullable<CallFunctionBlock>;
  blockNumber?: number;

  constructor({type, callbackBlock: funcRef, blockNumber}: IFlow) {
    this.type = type;
    this.callbackBlock = funcRef;
    this.blockNumber = blockNumber;
  }

  setFlow(flow: IFlow) {
    this.type = flow.type;
    this.callbackBlock = flow.callbackBlock;
    this.blockNumber = flow.blockNumber;
  }

  get displayName(): string {
    switch (this.type) {
      case 'break':
        return '중단';
      case 'continue':
        return '다음 반복';
      case 'block':
        return this.blockNumber?.toString() ?? this.type;
      case 'function':
        return this.callbackBlock?.funcRef?.funcName ?? this.type;
      default:
        return 'flow';
    }
  }
}

abstract class AIfBlock extends AAbstractBlock {
  abstract conditions: Condition[];
  /**
   * @deprecated Currently flow is not used since the Rabbit language is following ruby syntax
   */
  abstract flow: Flow;
}

export class IfBlock
  extends AbstractBlock
  implements AIfBlock, ConditionalBlock
{
  constructor(ref: string | FunctionBlock, options?: Partial<AIfBlock>) {
    super(options?.funcRef ?? processFuncRef(ref), options?.id);
    this.flow = options?.flow ?? new Flow({type: 'break'}); // default flow
    this.conditions = options?.conditions ?? [
      new Condition({blockRef: this.id, funcRef: this.funcRef!}),
    ];
  }

  name: BlockName = 'if';
  conditions: Condition[];
  /**
   * @deprecated Currently flow is not used since the Rabbit language is following ruby syntax
   */
  flow: Flow;

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

  /**
   * @deprecated Currently flow is not used since the Rabbit language is following ruby syntax
   */
  setFlow(flow: Flow) {
    this.actionChain(() => {
      this.flow = flow;
      if (this.flow.type === 'function') {
        this.flow.callbackBlock?.setActionChain(this.actionChain);
      }
    });
  }

  actionChain(actions: () => void) {
    actions();
    this.funcRef!.refFunc?.setBlock(this);
  }
}
