import {setTranspiling} from '@src/redux/slices/workspace';
import store from '@src/redux/store';
import {asAsync} from '@src/tools/async';
import {isDefined} from '@src/tools/bool-tools';
import {Nullable} from '@src/utils/types';
import {BlockName} from '../block-definitions/base/base';
import {
  AssignBlock,
  Assignment,
  Calculation,
} from '../block-definitions/functions/blocks/assign';
import {KeywordBlock} from '../block-definitions/block';
import {CallFunctionBlock} from '../block-definitions/functions/blocks/call-function';
import {Comparer} from '../block-definitions/functions/blocks/condition';
import {ForBlock} from '../block-definitions/functions/blocks/for';
import {IfBlock} from '../block-definitions/functions/blocks/if';
import {MotorBlock} from '../block-definitions/functions/blocks/motor';
import {WaitBlock} from '../block-definitions/functions/blocks/wait';
import {WhileBlock} from '../block-definitions/functions/blocks/while';
import {FunctionBlock} from '../block-definitions/functions/function';
import {VarRef} from '../block-definitions/variables/var-ref';
import {TSensor, Sensor} from '../block-definitions/helpers';
import {BinaryTable} from './binary';
import {
  Command,
  EndForCommand,
  EndIfCommand,
  ForCommand,
  IfCommand,
  RawCommand,
  CommandVariable,
  WaitCommand,
  RCCommand,
  CommandType,
  OPCommand,
  WhileCommand,
  EndWhileCommand,
} from './commands';
import {Alert} from 'react-native';
import {getVariables} from '@src/redux/queries/workspace';
import {v1 as uuidv1} from 'uuid';

// const MAX_COMMANDS = 255;

class CompileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CompileError';
  }
}

/**
 *
 * @param {Nullable<VarRef | number>} variable
 * @param {IExtractVarValueOptions} options
 * @returns {CommandVariable}
 *
 */

class _Transpiler {
  private entry: Nullable<FunctionBlock>;
  /**
   * @description Value : Variable Index
   *              Key : Variable Id
   */
  private variableIndexes: Record<string, string>;
  private userDeclaredVarIdx: number;
  private instructionsCount: number;
  private initializedVars: string[];

  private SENSOR_INDEX_STARTS_AT = 113;
  private CONST_INDEX_STARTS_AT = 124;

  constructor() {
    this.variableIndexes = {};
    this.initializedVars = [];
    this.userDeclaredVarIdx = 0;
    this.instructionsCount = 0;
    this.ast = this.ast.bind(this);
    this.processCommand = this.processCommand.bind(this);
    this.indexVariable = this.indexVariable.bind(this);
    this.indexSensor = this.indexSensor.bind(this);
    this.indexConstant = this.indexConstant.bind(this);
    this.getMain = this.getMain.bind(this);
    this.init = this.init.bind(this);
    this.extractVarValue = this.extractVarValue.bind(this);
    this.checkEntryExistance = this.checkEntryExistance.bind(this);
    this.logAST = this.logAST.bind(this);
    this.compile = this.compile.bind(this);
    this.cleanUp = this.cleanUp.bind(this);
    this.convertToBinary = this.convertToBinary.bind(this);
    this.getScopeOffset = this.getScopeOffset.bind(this);
    this.unpackBlocks = this.unpackBlocks.bind(this);
    this.loadVariable = this.loadVariable.bind(this);
    this.garbageCollector = this.garbageCollector.bind(this);
  }

  private getMain = (functions: FunctionBlock[]): Nullable<FunctionBlock> =>
    functions.find(func => func.isMain());

  async init(): Promise<void> {
    return asAsync(() => {
      store.dispatch(setTranspiling(true));
      this.entry = this.getMain(store.state.workspace.functions);
      this.userDeclaredVarIdx = 0;
      this.instructionsCount = 0;
      this.variableIndexes = {};
      Object.values(Sensor)
        .map<[TSensor, string]>((sensor, index) => [
          sensor,
          `$${this.SENSOR_INDEX_STARTS_AT + index}`,
        ])
        .map(([key, value]) => (this.variableIndexes[key] = value));
      new Array(4)
        .fill(null)
        .map<[string, string]>((_, index) => [
          `const${index}`,
          `$${this.CONST_INDEX_STARTS_AT + index}`,
        ])
        .map(([key, value]) => (this.variableIndexes[key] = value));
    });
  }

  private extractVarValue(
    variable: Nullable<VarRef | number>,
    shouldBeVariable?: boolean,
  ): CommandVariable {
    if (typeof variable === 'number') {
      if (shouldBeVariable) {
        throw new CompileError('Expected variable : Recieved constant');
      }
      if (variable < -1 * 2 ** 15 || variable > 2 ** 15 - 1) {
        throw new CompileError('Variable value out of range');
      }
      return variable;
    }
    const varId = variable?.ref;
    if (!varId) throw new CompileError('Cannot find reference variable');
    const refVar = variable.refVar;
    if (refVar?.isSensor || refVar?.isIterator) return refVar.varName;
    if (!isDefined(refVar?.value))
      throw new CompileError('Variable is not initialized');
    return varId;
  }

  /**
   * @description This method is for monitoring logs for testing
   */
  async logAST(): Promise<void> {
    await this.init();
    const AST = this.unpackBlocks(this.entry!.blocks)
      .filter(block => !!block)
      .cast<KeywordBlock>()
      .chain(this.ast)
      .map(this.processCommand)
      .mapEach(this.indexVariable)
      .mapEach(this.indexSensor)
      .reduce(this.indexConstant, [])
      .reduce(this.loadVariable, [])
      .chain(this.garbageCollector);
    const IR = AST.join(']\r\n[') // CRLF
      .concatLeft('[[')
      .concat(']]');
    const binaryCode = AST.map(this.convertToBinary)
      .concatLeft(this.instructionsCount)
      .toUint8Array();
    Transpiler.cleanUp();
    if (__DEV__ || process.env.NODE_ENV === 'test') {
      console.log(`${IR}\n\n${binaryCode}`);
    } else {
      Alert.alert('AST', IR);
    }
  }

  private checkEntryExistance(): void {
    if (!this.entry) {
      throw new CompileError('Entry not loaaded.');
    }
  }

  /**
   * @returns {string} Base64 encoded instructions
   *                   Looks like:
   *                   UInt8Array[ 32,21,18, ... ]
   */
  async compile(): Promise<string> {
    await this.init();
    this.checkEntryExistance();
    return asAsync(() => {
      return this.unpackBlocks(this.entry!.blocks)
        .filter(block => !!block)
        .cast<KeywordBlock>()
        .chain(this.ast)
        .map(this.processCommand)
        .mapEach(this.indexVariable)
        .mapEach(this.indexSensor)
        .reduce(this.indexConstant, [])
        .reduce(this.loadVariable, [])
        .chain(this.garbageCollector)
        .map(this.convertToBinary)
        .concatLeft(this.instructionsCount)
        .toUint8Array()
        .encodeFromUint8Array();
    });
  }

  cleanUp() {
    store.dispatch(setTranspiling(false));
  }

  private garbageCollector(commands: RawCommand[]): RawCommand[] {
    /**
     * key: variable index
     *
     * value : command index
     */
    let lastRefIndexes = new Array(this.userDeclaredVarIdx).fill(0);
    commands.forEach((command, index) => {
      command.forEach(instruction => {
        if (typeof instruction === 'string' && instruction.startsWith('$$')) {
          const varIndex = parseInt(instruction.slice(2), 10);
          lastRefIndexes[varIndex] = index;
        }
      });
    });
    lastRefIndexes = lastRefIndexes.map(i => i + 1);
    const allocatables = new Array(this.SENSOR_INDEX_STARTS_AT)
      .fill(0)
      .map((_, index) => `$${index}`);
    const varMap: Record<string, string> = {};
    return commands.map<RawCommand>((command, index) => {
      lastRefIndexes.forEach((ref, varIdxRaw) => {
        const varIdx = `$$${varIdxRaw}`;
        if (index === ref && !!varMap[varIdx]) {
          allocatables.unshift(varMap[varIdx]);
          delete varMap[varIdx];
        }
      });
      return command.map(instruction => {
        if (typeof instruction === 'string' && instruction.startsWith('$$')) {
          if (varMap[instruction]) return varMap[instruction];
          const allocatable = allocatables.shift();
          if (!allocatable) throw new CompileError('Out of memory');
          varMap[instruction] = allocatable;
          return allocatable;
        }
        return instruction;
      }) as RawCommand;
    });
  }

  private convertToBinary(command: RawCommand): number {
    this.instructionsCount++;
    const [commandType, ...args] = command;
    return args
      .map((arg, index) => {
        if (!arg) return 0;
        if (['if', 'while'].includes(commandType) && index === 0) {
          return BinaryTable.comparator[arg as Comparer];
        }
        if (commandType === 'op' && index === 1) {
          return BinaryTable.operator[arg as Calculation];
        }
        if (commandType === 'load' && index === 3 && typeof arg === 'number')
          return arg;
        if (typeof arg === 'string' && arg.startsWith('$')) {
          const parsed = parseInt(arg.slice(1), 10);
          if (isNaN(parsed))
            throw new CompileError(`Failed to parse an argument: ${arg}`);
          return parsed;
        }
        throw new CompileError(
          `Invalid command: Unexpected type of argument recieved : ${arg} ( Argument Index: ${index}, Command Type: ${commandType} )`,
        );
      })
      .reverse()
      .concat(BinaryTable.commandType[commandType])
      .map((argInBinary, index) => argInBinary << (index * 7)) // eslint-disable-line no-bitwise
      .reduce((acc, cur) => acc | cur, 0); // eslint-disable-line no-bitwise
  }

  private loadVariable(acc: RawCommand[], cur: RawCommand): RawCommand[] {
    const varLoaders: RawCommand[] = [];
    cur.forEach(instruction => {
      if (typeof instruction === 'string' && instruction?.startsWith('$$')) {
        const varId = Object.entries(this.variableIndexes).find(
          ([_, value]) => value === instruction,
        )?.[0];
        if (!!varId && !this.initializedVars.includes(varId)) {
          const variable = getVariables(store.state).find(v => v?.id === varId);
          if (typeof variable?.value === 'number') {
            varLoaders.push(['load', instruction, null, null, variable?.value]);
          }
          if (typeof variable?.value === 'object' && !!variable?.value?.ref) {
            varLoaders.push(['load', instruction, null, null, 0]);
            varLoaders.push(['load', '$127', null, null, 0]);
            varLoaders.push([
              'op',
              instruction,
              'add',
              this.variableIndexes[variable.value.ref],
              '$127',
            ]);
          }
        }
      }
    });
    return [...acc, ...varLoaders, cur];
  }

  private indexConstant(acc: RawCommand[], cur: RawCommand): RawCommand[] {
    const constantLoaders: RawCommand[] = [];
    const [commandType, ...args] = cur;
    args.forEach((arg, index) => {
      if (typeof arg !== 'number') return;
      if (arg < -1 * 2 ** 15 || arg > 2 ** 15 - 1) {
        throw new CompileError('Constant value out of range');
      }
      /**
       * @description Those commands are not allowed to have constants at arg1
       */
      if (['if', 'while'].includes(commandType) && index === 0) return;
      /**
       * @description Those commands are not allowed to have constants at arg1, arg2, and arg3
       */
      if (
        ['for', 'endFor', 'wait', 'endWhile'].includes(commandType) &&
        index < 3
      ) {
        return;
      }
      /**
       * @description Those commands are not allowed to have constants at arg1 and arg2
       */
      if (commandType === 'op' && index < 2) return;
      constantLoaders.push([
        'load',
        this.variableIndexes[`const${index}`],
        null,
        null,
        arg,
      ]);
      cur[index + 1] = this.variableIndexes[`const${index}`];
    });
    return [...acc, ...constantLoaders, cur];
  }

  private indexSensor(value: any, [index]: [number, number]): any {
    if (index === 0) return value as CommandType;
    if (!Object.values(Sensor).includes(value)) return value;
    return this.variableIndexes[value];
  }

  private indexVariable(value: any, [index]: [number, number]): any {
    if (index === 0) return value as CommandType;
    const reUUID =
      /[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}/;
    if (!reUUID.test(value)) return value;
    if (Object.keys(this.variableIndexes).includes(value))
      return this.variableIndexes[value];
    const varIdx = `$$${this.userDeclaredVarIdx}`;
    this.variableIndexes[value] = varIdx;
    this.userDeclaredVarIdx++;
    return varIdx;
  }

  private processCommand(command: Command): RawCommand {
    if (command.type === 'if') {
      const {offset, left, right, comparer} = command as IfCommand;
      return ['if', comparer, left, right, offset];
    }
    if (command.type === 'for') {
      const {loopCount} = command as ForCommand;
      return ['for', null, null, null, loopCount];
    }
    if (command.type === 'while') {
      const {offset, left, right, comparer} = command as WhileCommand;
      return ['while', comparer, left, right, offset];
    }
    // if (command.type === 'motor') {
    //   const {portNumber, thrust} = command as MotorCommand;
    //   return ['motor', portNumber, thrust, null, null];
    // }
    if (command.type === 'wait') {
      const {value: time} = command as WaitCommand;
      return ['wait', null, null, null, time];
    }
    if (command.type === 'endIf') {
      return ['endIf', null, null, null, null];
    }
    if (command.type === 'endFor') {
      const {offset} = command as EndForCommand;
      return ['endFor', null, null, null, offset];
    }
    if (command.type === 'endWhile') {
      const {offset} = command as EndWhileCommand;
      return ['endWhile', null, null, null, offset];
    }
    if (command.type === 'rc') {
      const {roll, pitch, yaw, throttle} = command as RCCommand;
      return ['rc', roll, pitch, yaw, throttle];
    }
    if (command.type === 'op') {
      const {variable, operator, left, right} = command as OPCommand;
      return ['op', variable, operator, left, right];
    }
    throw new CompileError(`Unknown command type : ${command.type}`);
  }

  private ast(blocks: KeywordBlock[]): Command[] {
    const AST: Command[] = [];
    /**
     *
     * @param {KeywordBlock[]} _blocks
     *
     * @info Currently, only the commands below are supported, and these are compiled like the below
     *       - @type {IfBlock} : [ @param {'if'} if, @param {Comparer} comparator, @param {CommandVariable} left, @param {CommandVariable} right, @param {Number} offset ]
     *       - @type {ForBlock} : [ @param {'for'} for, @param {CommandVariable} loopCount, @param {null} null, @param {null} null, @param {null} null ]
     *       - @type {MotorBlock} : [ @param {'motor'} motor, @param {number} portNumber, @param {CommandVariable} thrust, @param {null} null, @param {null} null ]
     *       - @type {WaitBlock} : [ @param {'wait'} wait, @param {CommandVariable} time, @param {null} null, @param {null} null, @param {null} null ]
     *       Since Motor command is hard to implement at current situation, there's RC command for it, which is the alternative
     *       - @type {RCCommand} : [ @param {'rc'} rc, @param {CommandVariable} roll, @param {CommandVariable} pitch, @param {CommandVariable} yaw, @param {CommandVariable} throttle ]
     */
    const _ast = (_blocks: KeywordBlock[]) => {
      for (let i = 0; i < _blocks.length; i++) {
        const block = _blocks[i];
        /**
         * @description IF BLOCK COMPILATION
         */
        if (block.name === 'if') {
          let left: CommandVariable;
          let right: CommandVariable;
          let comparer: Comparer;
          try {
            const condition = (block as IfBlock).conditions[0];
            left = this.extractVarValue(condition.left);
            right = this.extractVarValue(condition.right);
            comparer = condition.comparer;
          } catch (error: any) {
            throw new CompileError(error?.message);
          }
          const offset = this.getScopeOffset(_blocks.slice(i + 1));
          AST.push(
            new IfCommand({
              offset,
              left,
              right,
              comparer,
            }),
          );
          _ast(_blocks.slice(i + 1, i + offset));
          AST.push(new EndIfCommand());
          i += offset;
          continue;
        }
        /**
         * @description FOR BLOCK COMPILATION
         */
        if (block.name === 'for') {
          let loopCount: CommandVariable;
          try {
            loopCount = this.extractVarValue((block as ForBlock).loopCount);
          } catch (error: any) {
            throw new CompileError(error?.message);
          }
          const offset = this.getScopeOffset(_blocks.slice(i + 1));
          AST.push(
            new ForCommand({
              loopCount,
            }),
          );
          _ast(_blocks.slice(i + 1, i + offset));
          AST.push(new EndForCommand({offset}));
          i += offset;
          continue;
        }
        /**
         * @description WHILE BLOCK COMPILATION
         */
        if (block.name === 'while') {
          let left: CommandVariable;
          let right: CommandVariable;
          let comparer: Comparer;
          try {
            const condition = (block as WhileBlock).conditions[0];
            left = this.extractVarValue(condition.left);
            right = this.extractVarValue(condition.right);
            comparer = condition.comparer;
          } catch (error: any) {
            throw new CompileError(error?.message);
          }
          const offset = this.getScopeOffset(_blocks.slice(i + 1));
          AST.push(
            new WhileCommand({
              offset,
              left,
              right,
              comparer,
            }),
          );
          _ast(_blocks.slice(i + 1, i + offset));
          AST.push(new EndWhileCommand({offset}));
          i += offset;
          continue;
        }
        /**
         * @description MOTOR BLOCK COMPILATION
         */
        if (block.name === 'motor') {
          const rcInfo = (block as MotorBlock)?.rcInfo;
          if (!rcInfo) throw new CompileError('Invalid motor block');
          AST.push(
            new RCCommand({
              yaw: this.extractVarValue(rcInfo.yaw),
              roll: this.extractVarValue(rcInfo.roll),
              pitch: this.extractVarValue(rcInfo.pitch),
              throttle: this.extractVarValue(rcInfo.throttle),
            }),
          );
          continue;
        }
        /**
         * @description WAIT BLOCK COMPILATION
         */
        if (block.name === 'wait') {
          const time = (block as WaitBlock)?.value;
          if (!time) throw new CompileError('Invalid wait block');
          AST.push(
            new WaitCommand({
              value: this.extractVarValue(time),
            }),
          );
          continue;
        }
        /**
         * @description ASSIGN BLOCK COMPILATION
         */
        if (block.name === 'assign') {
          const {assignments} = block as AssignBlock;
          assignments.forEach(assignment => {
            const {variable, left, calculation, right} =
              assignment as Assignment;
            if (!calculation)
              throw new CompileError(
                'Invalid assign block : Operator not defined',
              );
            AST.push(
              new OPCommand({
                variable: this.extractVarValue(variable, true) as string,
                left: this.extractVarValue(left),
                operator: calculation,
                right: this.extractVarValue(right),
              }),
            );
          });
          continue;
        }
        throw new CompileError(`Unsupported block: ${block.name}`);
      }
    };
    _ast(blocks);
    return AST;
  }

  /**
   *
   * @param {KeywordBlock[]} blocks Head scope command excluded
   * @returns {number} Indicates difference of blocks of scope
   */
  private getScopeOffset(blocks: KeywordBlock[]): number {
    let scopeCount = 0;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if ((['if', 'for', 'while'] as BlockName[]).includes(block.name)) {
        scopeCount++;
      }
      if (block.name === 'end') {
        scopeCount--;
      }
      if (scopeCount === -1) {
        return i + 1;
      }
    }
    throw new CompileError('Scope not closed');
  }

  private unpackBlocks(
    blocks: Nullable<KeywordBlock>[],
  ): Nullable<KeywordBlock>[] {
    const unpackedBlocks: Nullable<KeywordBlock>[] = [];
    const _unpackBlocks = (_blocks: Nullable<KeywordBlock>[]) => {
      for (const block of _blocks) {
        if (block?.name === 'function') {
          if (!block?.funcRef?.ref)
            throw new CompileError('Invalid function block');
          const functionBlocks = (block as CallFunctionBlock).callback.refFunc
            ?.blocks;
          const passedInputs = (block as CallFunctionBlock).inputs;
          const functionInputs = (block as CallFunctionBlock).callback?.refFunc
            ?.config.inputVars;
          if (!functionBlocks) throw new CompileError('Function has no blocks');
          /**
           * @description Assigning input variables to given input by user
           */
          passedInputs.forEach(input => {
            const original = functionInputs?.find(
              functionInput => functionInput.varName === input?.varName,
            );
            const id = uuidv1();
            unpackedBlocks.push(
              new AssignBlock(block.funcRef?.ref!, {
                id,
                assignments: [
                  new Assignment({
                    variable: original?.ref,
                    left: input?.ref ?? 0,
                    right: 0,
                    calculation: 'add',
                    funcRef: block.funcRef!,
                    blockRef: id,
                  }),
                ],
              }),
            );
          });
          _unpackBlocks(functionBlocks);
        } else {
          unpackedBlocks.push(block);
        }
      }
    };
    try {
      _unpackBlocks(blocks);
    } catch (error: any) {
      throw new CompileError(error?.message);
    }
    return unpackedBlocks;
  }
}

export const Transpiler = new _Transpiler();
