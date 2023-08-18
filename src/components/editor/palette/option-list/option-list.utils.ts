import {Calculation} from '@src/modules/block-definitions/functions/blocks/assign';
import {Comparer} from '@src/modules/block-definitions/functions/blocks/condition';
import {Flow} from '@src/modules/block-definitions/functions/blocks/if';
import {FuncRef} from '@src/modules/block-definitions/functions/func-ref';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';

export type OptionType =
  | 'function'
  | 'variable'
  | 'calculation'
  | 'comparer'
  | 'keyword'
  | 'input'
  | 'null'
  | 'iterator'
  | 'block';

export interface IOptionItem<T = OptionData> {
  type: OptionType;
  displayName: string;
  data: T;
}

export type OptionData =
  | FuncRef
  | VarRef
  | Comparer
  | Flow
  | number
  | Calculation
  | null
  | undefined
  | 'null'
  | 'iterator';

export class OptionItem<T = OptionData> {
  type: OptionType;
  displayName: string;
  data: T;

  constructor({type, displayName, data}: IOptionItem<T>) {
    this.type = type;
    this.displayName = displayName;
    this.data = data;
  }
}
