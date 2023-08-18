import {Calculation} from '../block-definitions/functions/blocks/assign';
import {Comparer} from '../block-definitions/functions/blocks/condition';
import {TSensor} from '../block-definitions/helpers';

export type CommandType =
  | 'if'
  | 'for'
  | 'while'
  // | 'motor'
  | 'wait'
  | 'endFor'
  | 'endIf'
  | 'endWhile'
  | 'rc'
  | 'load'
  | 'op';

/**
 * @description @type {RawCommand} are defined as below which depends upon command type.
 *              @definition command `if`: [@param {'if'} if, @param {Comparer} comparer, @param {CommandVariable} left, @param {CommandVariable} right, @param {Number} offset ]
 *              @definition command `end-if`: [@param {'end-if'} endIf, @param {null} null, @param {null} null, @param {null} null, @param {null} null ]
 *              @definition command `while`: [@param {'while'} while, @param {Comparer} comparer, @param {CommandVariable} left, @param {CommandVariable} right, @param {Number} offset ]
 *              @definition command `end-while`: [@param {'end-while'} endFor, @param {Number} diff, @param {null} null, @param {null} null, @param {null} null ]
 *              @definition command `for`: [@param {'for'} for, @param {CommandVariable} loopCount, @param {null} null, @param {null} null, @param {null} null ]
 *              @definition command `end-for`: [@param {'end-for'} endFor, @param {null} null, @param {null} null, @param {null} null, @param {Number} offset ]
 *              @definition command `motor`: [@param {'motor'} motor, @param {CommandVariable} portNumber, @param {CommandVariable} thrust, @param {null} null, @param {null} null ]
 *              @definition command `rc`: [ @param {'rc'} rc, @param {CommandVariable} roll, @param {CommandVariable} pitch, @param {CommandVariable} yaw, @param {CommandVariable} throttle ]
 *              @definition command `wait`: [@param {'wait'} wait, @param {CommandVariable} value, @param {null} null, @param {null} null, @param {null} null ]
 *              @definition command `op`: [@param {'op'} op, @param {CommandVariable} variable, @param {Calculation} operator, @param {CommandVariable} left, @param {CommandVariable} right ]
 */
export type RawCommand = [CommandType, any, any, any, any];

export type CommandVariable = number | TSensor | 'iterator' | string;

export abstract class Command {
  abstract type: CommandType;
}

export class OPCommand extends Command {
  type: 'op';
  variable: string;
  operator: Calculation;
  left: CommandVariable;
  right: CommandVariable;
  constructor(options: Omit<OPCommand, 'type'>) {
    super();
    this.type = 'op';
    this.variable = options.variable;
    this.operator = options.operator;
    this.left = options.left;
    this.right = options.right;
  }
}

export class RCCommand extends Command {
  type: 'rc';
  roll: CommandVariable;
  pitch: CommandVariable;
  yaw: CommandVariable;
  throttle: CommandVariable;
  constructor({roll, pitch, yaw, throttle}: Omit<RCCommand, 'type'>) {
    super();
    this.type = 'rc';
    this.roll = roll;
    this.pitch = pitch;
    this.yaw = yaw;
    this.throttle = throttle;
  }
}

export class IfCommand extends Command {
  type: 'if';
  comparer: Comparer;
  left: CommandVariable;
  right: CommandVariable;
  offset: Number;

  constructor({comparer, left, right, offset}: Omit<IfCommand, 'type'>) {
    super();
    this.type = 'if';
    this.comparer = comparer;
    this.left = left;
    this.right = right;
    this.offset = offset;
  }
}

export class EndIfCommand extends Command {
  type: 'endIf';

  constructor() {
    super();
    this.type = 'endIf';
  }
}

export class WhileCommand extends Command {
  type: 'while';
  comparer: Comparer;
  left: CommandVariable;
  right: CommandVariable;
  offset: Number;

  constructor({comparer, left, right, offset}: Omit<WhileCommand, 'type'>) {
    super();
    this.type = 'while';
    this.comparer = comparer;
    this.left = left;
    this.right = right;
    this.offset = offset;
  }
}

export class EndWhileCommand extends Command {
  type: 'endWhile';
  offset: Number;

  constructor({offset}: Omit<EndWhileCommand, 'type'>) {
    super();
    this.type = 'endWhile';
    this.offset = offset;
  }
}

export class ForCommand extends Command {
  type: 'for';
  loopCount: CommandVariable;

  constructor({loopCount}: Omit<ForCommand, 'type'>) {
    super();
    this.type = 'for';
    this.loopCount = loopCount;
  }
}

export class EndForCommand extends Command {
  type: 'endFor';
  offset: Number;

  constructor({offset}: Omit<EndForCommand, 'type'>) {
    super();
    this.type = 'endFor';
    this.offset = offset;
  }
}

// export class MotorCommand extends Command {
//   type: 'motor';
//   portNumber: CommandVariable;
//   thrust: CommandVariable;

//   constructor({portNumber, thrust}: Omit<MotorCommand, 'type'>) {
//     super();
//     this.type = 'motor';
//     this.portNumber = portNumber;
//     this.thrust = thrust;
//   }
// }

export class WaitCommand extends Command {
  type: 'wait';
  value: CommandVariable;

  constructor({value}: Omit<WaitCommand, 'type'>) {
    super();
    this.type = 'wait';
    this.value = value;
  }
}
