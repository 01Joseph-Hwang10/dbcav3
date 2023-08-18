import {Event, EventRegistry} from '@src/modules/event/event';
import {
  AAbstractBlock,
  AbstractBlock,
  ActionChain,
  BlockName,
} from '../../base/base';
import {FuncRef} from '../func-ref';
import {VarRef} from '../../variables/var-ref';
import {VarBlock} from '../../variables/variable';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FunctionConfig} from '../config';

abstract class ACallFunctionBlock extends AAbstractBlock {
  abstract callback: FuncRef;
  abstract inputs: VarBlock[];
  /**
   * @description If null, the block binds to {FunctionBlock}
   *              else, the block binds to {WorkspaceBlock} which uses this property as actionChain
   *
   *              If you want to bind to {WorkspaceBlock}, you need to set this property
   *              either in constructor or in {setActionChain}
   */
  abstract actionChain: ActionChain;
}

export class CallFunctionBlock
  extends AbstractBlock
  implements ACallFunctionBlock
{
  callback: FuncRef;
  inputs: VarBlock[];
  name: BlockName = 'function';
  actionChain: ActionChain;

  setActionChain(actionChain: ActionChain) {
    this.actionChain = actionChain;
  }

  private registerInputsListener() {
    EventRegistry.on<VarBlock[]>(
      Event.onChangeInputVars(this.callback.ref),
      () => {
        this.inputs = this.getInputs();
      },
    );
  }

  private defaultActionChain: ActionChain = actions => {
    actions();
    this.funcRef?.refFunc?.setBlock(this);
  };

  constructor(ref: string | FuncRef, options?: Partial<ACallFunctionBlock>) {
    super(options?.funcRef ?? ref, options?.id);
    this.actionChain = options?.actionChain ?? this.defaultActionChain;
    if (options?.callback) {
      this.callback = options.callback;
    } else {
      if (typeof ref === 'string') {
        this.callback = new FuncRef(ref);
      } else {
        this.callback = ref;
      }
    }
    this.inputs = options?.inputs ?? this.getInputs();
    this.registerInputsListener();
  }

  setCallback(callback: FuncRef) {
    this.actionChain(() => {
      EventRegistry.remove(Event.onChangeInputVars(this.callback.ref));
      this.callback = callback;
      this.inputs = this.getInputs();
      this.registerInputsListener();
    });
  }

  /**
   *
   * @returns {VarBlock[]}
   *
   * @description Copies @property {VarBlock[]} inputVars from @type {FunctionConfig}
   *              to prevent the original data from being modified
   *
   */
  private getInputs(): VarBlock[] {
    return (
      this.callback.refFunc?.config.inputVars.map(
        input =>
          new VarBlock({
            varName: input.varName,
            varType: input.varType,
            value: input.value,
            isSensor: input.isSensor,
            funcRef: null,
          }),
      ) ?? []
    );
  }

  updateInputs() {
    this.setInputs(this.getInputs());
  }

  setInputs(inputs: VarBlock[]) {
    this.actionChain(() => {
      this.inputs = inputs;
    });
  }

  setInput(key: string, value: number | VarRef) {
    this.actionChain(() => {
      const index = this.inputs.findIndex(input => input?.varName === key);
      this.inputs[index]?.setValueAsInput(value);
    });
  }
}
