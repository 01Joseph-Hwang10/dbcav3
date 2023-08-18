import {update, updateFunc} from '@src/redux/slices/workspace';
import store from '@src/redux/store';
import {handleError} from '@src/tools/debug';
import {randomStringWithDate} from '@src/tools/string-tools';
import {Nullable} from '@src/utils/types';
import {v1 as uuidv1} from 'uuid';
import {BlockName} from '../base/base';
import {AssignBlock} from './blocks/assign';
import {KeywordBlock} from '../block';
import {FunctionConfig} from './config';
import {ForBlock} from './blocks/for';
import {FuncRef} from './func-ref';
import {IfBlock} from './blocks/if';
import {MotorBlock} from './blocks/motor';
import {WaitBlock} from './blocks/wait';
import {VarBlock} from '../variables/variable';
import {CallFunctionBlock} from './blocks/call-function';
import {EndBlock} from './blocks/end';
import {WhileBlock} from './blocks/while';

abstract class AFunctionBlock {
  abstract funcName: string;
  abstract id: string;
  abstract config: FunctionConfig;
  abstract blocks: Nullable<KeywordBlock>[];
  abstract deletable: boolean;
  abstract localVars: VarBlock[];
}

/**
 * @description BlockGetter is defined for testing transpiler.
 *              It uses singleton pattern to keep up with the state from redux store.
 */
type BlockGetter<T extends KeywordBlock = KeywordBlock> = () => T;

const initialBlockNumber = 9;

export class FunctionBlock implements AFunctionBlock {
  id: string;
  config: FunctionConfig;
  /**
   * @description The array's length is 8, and each index represents order
   *              To change block's number,
   *              you should modify this property's initializer at the constructor
   *
   */
  blocks: Nullable<KeywordBlock>[];
  deletable: boolean;
  localVars: VarBlock[];

  constructor(options?: Partial<AFunctionBlock>) {
    const funcName = options?.funcName ?? randomStringWithDate();
    this.id = options?.id ?? uuidv1();
    this.config =
      options?.config ?? new FunctionConfig(funcName, new FuncRef(this.id));
    this.blocks = options?.blocks ?? new Array(initialBlockNumber).fill(null);
    this.deletable = options?.deletable ?? true;
    this.localVars = options?.localVars ?? [];
  }

  static fromJSON(json: AFunctionBlock): FunctionBlock {
    const id = json.id;
    const funcName = json.funcName;
    const config = new FunctionConfig(funcName, new FuncRef(json.id));
    const blocks = json.blocks.map(block =>
      !!block
        ? FunctionBlock.buildBlockByBlockName(id, block!.name, block!)
        : null,
    );
    const deletable = json.deletable;
    const localVars = json.localVars.map(varBlock =>
      VarBlock.fromJSON(varBlock, new FuncRef(id)),
    );
    return new FunctionBlock({
      id,
      funcName,
      config,
      blocks,
      deletable,
      localVars,
    });
  }

  get inputVars(): VarBlock[] {
    return this.blocks
      .filter(block => block?.name === 'function')
      .cast<CallFunctionBlock>()
      .map(callFunctionBlock => callFunctionBlock.inputs)
      .flat();
  }

  private update() {
    store.dispatch(update());
  }

  actionChain(actions: () => void) {
    actions();
    const index = store.state.workspace.functions.findIndex(
      func => func.id === this.id,
    );
    store.dispatch(
      updateFunc({
        newFunc: this,
        index,
      }),
    );
    this.update();
  }

  get index(): number {
    return store.state.workspace.functions.findIndex(
      func => func.id === this.id,
    );
  }

  get funcName(): string {
    return this.config.funcName;
  }

  /**
   * @returns {FuncRef} FuncRef of itself
   */
  get ref(): FuncRef {
    return new FuncRef(this.id);
  }

  addBlockSpaces() {
    this.actionChain(() => {
      this.blocks.push(...new Array(3).fill(null));
    });
  }

  getBlockById<T = KeywordBlock>(id: string): Nullable<T> {
    return this.blocks.find(block => block && block.id === id) as Nullable<T>;
  }

  getBlock(index: number) {
    return this.blocks[index];
  }

  private getBlockIndex = (block: KeywordBlock | string) => {
    return this.blocks.findIndex(b => {
      if (!b) return false;
      if (typeof block === 'string') {
        return b.id === block;
      } else {
        return b.id === block.id;
      }
    });
  };

  setBlock(newBlock: KeywordBlock) {
    this.actionChain(() => {
      const index = this.getBlockIndex(newBlock);
      this.blocks[index] = newBlock;
    });
  }

  insertBlock<T extends KeywordBlock = KeywordBlock>(
    newBlock: KeywordBlock,
    index: number,
  ): BlockGetter<T> {
    this.actionChain(() => {
      this.blocks[index] = newBlock;
    });
    return () => this.blocks[index]! as T;
  }

  deleteBlock(block: KeywordBlock | string) {
    this.actionChain(() => {
      const index = this.getBlockIndex(block);
      this.blocks[index] = null;
    });
  }

  static buildBlockByBlockName(
    id: string,
    blockName: BlockName,
    options?: Partial<KeywordBlock>,
  ): KeywordBlock {
    switch (blockName) {
      case 'assign':
        return new AssignBlock(id, options);
      case 'end':
        return new EndBlock(id);
      case 'for':
        return new ForBlock(id, options);
      case 'if':
        return new IfBlock(id, options);
      case 'motor':
      case 'control':
        return new MotorBlock(id, options);
      case 'wait':
        return new WaitBlock(id, options);
      case 'function':
        return new CallFunctionBlock(id, options);
      case 'while':
        return new WhileBlock(id, options);
      default:
        throw new Error(`${blockName} is not supported`);
    }
  }

  /**
   *
   * @param {BlockName} blockName
   * @param {number} index
   *
   * @description Note that block will be inserted only if @param blockName results one of the following:
   *              - @type {AssignBlock}
   *              - @type {ForBlock}
   *              - @type {IfBlock}
   *              - @type {WhileBlock}
   *              - @type {MotorBlock}
   *              - @type {WaitBlock}
   *              - @type {CallFunctionBlock}
   *              - @type {EndBlock}
   *
   */
  insertBlockByBlockName<T extends KeywordBlock = KeywordBlock>(
    blockName: BlockName,
    index: number,
    options?: Partial<KeywordBlock>,
  ): BlockGetter<T> {
    return this.insertBlock(
      FunctionBlock.buildBlockByBlockName(this.id, blockName, options),
      index,
    );
  }

  clearBlocks() {
    this.actionChain(() => {
      this.blocks = new Array(8).fill(null);
    });
  }

  setConfig(config: FunctionConfig) {
    this.actionChain(() => {
      this.config = config;
    });
  }

  isMain(): boolean {
    return this.funcName === '메인';
  }

  isSensor(): boolean {
    return this.funcName !== '메인' && this.deletable === false;
  }

  createLocalVar(variable?: VarBlock) {
    this.actionChain(() => {
      if (variable) {
        this.localVars.push(variable);
      } else {
        this.localVars.push(
          new VarBlock({
            varName: randomStringWithDate(),
            value: null,
            varType: 'local',
            funcRef: new FuncRef(this.id),
          }),
        );
      }
    });
  }

  private findVarIndexById(id: string): number {
    const index = this.localVars.findIndex(localVar => localVar.id === id);
    if (index < 0) {
      handleError(index);
    }
    return index;
  }

  updateLocalVar(variable: VarBlock) {
    this.actionChain(() => {
      const index = this.findVarIndexById(variable.id);
      this.localVars[index] = variable;
    });
  }

  deleteLocalVar(variable: VarBlock) {
    this.actionChain(() => {
      const index = this.findVarIndexById(variable.id);
      this.localVars.splice(index, 1);
    });
  }
}
