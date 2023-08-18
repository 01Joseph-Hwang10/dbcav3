import {Calculation} from '../block-definitions/functions/blocks/assign';
import {Comparer} from '../block-definitions/functions/blocks/condition';
import {CommandType} from './commands';

export const commandTypeShift = 28; // Type
export const comparerShift = 21; // Arg 1
export const operatorShift = 14; // Arg 2
// 7 : Arg 3
// 0 : Arg 4

export namespace BinaryTable {
  export const commandType: Record<CommandType, number> = {
    if: 0,
    endIf: 1,
    for: 2,
    endFor: 3,
    rc: 4,
    wait: 5,
    load: 6,
    op: 7,
    while: 8,
    endWhile: 9,
  };

  export const comparator: Record<Comparer, number> = {
    eq: 0,
    neq: 1,
    gt: 2,
    lt: 3,
    gte: 4,
    lte: 5,
  };

  export const operator: Record<Calculation, number> = {
    add: 0,
    subtract: 1,
    multiply: 2,
    divide: 3,
    modulo: 4,
  };
}
