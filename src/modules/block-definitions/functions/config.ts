import {handleError} from '@src/tools/debug';
import {Event, EventRegistry} from '@src/modules/event/event';
import {randomStringWithDate} from '@src/tools/string-tools';
import {AAbstractBlock, AbstractBlock, BlockName} from '../base/base';
import {VarBlock} from '../variables/variable';
import {FuncRef} from './func-ref';

abstract class AFunctionConfig extends AAbstractBlock {
  abstract funcName: string;
  abstract inputVars: VarBlock[];
  abstract funcRef: FuncRef;
}

export class FunctionConfig extends AbstractBlock implements AFunctionConfig {
  name: BlockName = 'config';
  funcName: string;
  funcRef: FuncRef;
  inputVars: VarBlock[];

  constructor(funcName: string, funcRef: FuncRef, inputVars?: VarBlock[]) {
    super(funcRef);
    this.funcName = funcName;
    this.funcRef = funcRef;
    this.inputVars = inputVars ?? [];
  }

  static fromJSON(json: AFunctionConfig, funcRef: FuncRef): FunctionConfig {
    const funcName = json.funcName;
    const inputVars = json.inputVars?.map(inputVar =>
      VarBlock.fromJSON(inputVar, funcRef),
    );
    return new FunctionConfig(funcName, funcRef, inputVars);
  }

  setFuncName(funcName: string) {
    this.actionChain(() => {
      this.funcName = funcName;
    });
  }

  createInputVar(variable?: VarBlock) {
    this.actionChain(() => {
      if (variable) {
        this.inputVars.push(variable);
      } else {
        this.inputVars.push(
          new VarBlock({
            varName: randomStringWithDate(),
            value: null,
            varType: 'input',
            funcRef: this.funcRef,
          }),
        );
      }
    });
  }

  private findVarIndexById(id: string): number {
    const index = this.inputVars.findIndex(inputVar => inputVar.id === id);
    if (index < 0) {
      handleError(index);
    }
    return index;
  }

  updateInputVar(variable: VarBlock) {
    this.actionChain(() => {
      const index = this.findVarIndexById(variable.id);
      this.inputVars[index] = variable;
    });
  }

  deleteInputVar(variable: VarBlock) {
    this.actionChain(() => {
      const index = this.findVarIndexById(variable.id);
      this.inputVars.splice(index, 1);
    });
  }

  actionChain(actions: () => void) {
    actions();
    EventRegistry.emit(Event.onChangeInputVars(this.funcRef.ref));
    this.funcRef.refFunc?.setConfig(this);
  }
}
