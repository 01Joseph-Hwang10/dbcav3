import {Nullable} from '@src/utils/types';
import {FuncRef} from '../func-ref';
import {VarRef} from '../../variables/var-ref';
import {v1 as uuidv1} from 'uuid';

export interface ConditionalBlock {
  createCondition(condition?: Condition): void;
  updateCondition(newCondition: Condition): void;
  deleteCondition(condition: Condition | string): void;
}

export type Comparer = 'eq' | 'neq' | 'gte' | 'gt' | 'lte' | 'lt';

export const negateComparer = (comparer: Comparer): Comparer => {
  switch (comparer) {
    case 'eq':
      return 'neq';
    case 'neq':
      return 'eq';
    case 'gte':
      return 'lt';
    case 'gt':
      return 'lte';
    case 'lte':
      return 'gt';
    case 'lt':
      return 'gte';
  }
};
export type Comparee = Nullable<VarRef | number>;

export interface ICondition {
  left?: Comparee;
  comparer: Comparer;
  right?: Comparee;
  id: string;
  blockRef: string;
  funcRef: FuncRef;
}

export class Condition {
  left?: Comparee;
  comparer: Comparer;
  right?: Comparee;
  id: string;
  blockRef: string;
  funcRef: FuncRef;

  constructor(
    options: Omit<ICondition, 'id' | 'comparer'> &
      Partial<Pick<ICondition, 'id' | 'comparer'>>,
  ) {
    this.left = options?.left ?? 0;
    this.right = options?.right ?? 0;
    this.comparer = options?.comparer ?? 'eq';
    this.id = options?.id ?? uuidv1();
    this.blockRef = options.blockRef;
    this.funcRef = options.funcRef;
  }

  setLeft(left: Comparee) {
    this.actionChain(() => {
      this.left = left;
    });
  }

  setRight(right: Comparee) {
    this.actionChain(() => {
      this.right = right;
    });
  }

  setComparer(comparer: Comparer) {
    this.actionChain(() => {
      this.comparer = comparer;
    });
  }

  actionChain(actions: () => void) {
    actions();
    const refBlock = this.funcRef.refFunc?.blocks.find(
      block => block && block.id === this.blockRef,
    );
    if (!refBlock || !['if', 'while'].includes(refBlock.name)) {
      throw Error('Ref not compatible');
    }
    (refBlock as ConditionalBlock).updateCondition(this);
  }
}
