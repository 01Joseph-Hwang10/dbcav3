import {saveCurrentImage} from '@src/hooks/useAutoSave';
import {deleteGlobalVar, updateGlobalVar} from '@src/redux/slices/workspace';
import store from '@src/redux/store';
import {randomStringWithDate} from '@src/tools/string-tools';
import {Nullable} from '@src/utils/types';
import {v1 as uuidv1} from 'uuid';
import {FuncRef} from '../functions/func-ref';
import {VarRef} from './var-ref';

type VarType = 'global' | 'local' | 'input';

abstract class AVarBlock {
  abstract varName?: string;
  abstract value?: Nullable<number | VarRef>;
  abstract isSensor?: boolean;
  abstract isIterator?: boolean;
  abstract id: string;
  abstract varType: VarType;
  /**
   * @description null if the variable is global or input
   */
  abstract funcRef: Nullable<FuncRef>;
}

export class VarBlock implements AVarBlock {
  id: string;
  varName: string;
  isSensor: boolean;
  isIterator: boolean;
  value: Nullable<number | VarRef>;
  varType: VarType;
  funcRef: Nullable<FuncRef>;

  constructor({
    varName,
    varType,
    value,
    isSensor,
    isIterator,
    funcRef,
    id,
  }: Omit<AVarBlock, 'id'> & Partial<Pick<AVarBlock, 'id'>>) {
    this.id = id ?? uuidv1();
    this.varName = varName ?? randomStringWithDate();
    this.isSensor = isSensor ?? false;
    this.isIterator = isIterator ?? false;
    this.varType = varType;
    this.funcRef = funcRef;
    if (this.isSensor || this.isIterator) {
      this.value = value;
    } else {
      this.value = value ?? 0;
    }
  }

  static fromJSON(json: AVarBlock, funcRef?: FuncRef): VarBlock {
    const value: Nullable<number | VarRef> =
      typeof json.value === 'number'
        ? json.value
        : json.value?.ref
        ? new VarRef(json.value?.ref)
        : null;
    return new VarBlock({
      varName: json.varName,
      varType: json.varType,
      value,
      isSensor: json.isSensor,
      isIterator: json.isIterator,
      funcRef: json.funcRef?.ref ? new FuncRef(json.funcRef?.ref) : funcRef,
      id: json.id,
    });
  }

  get ref(): VarRef {
    return new VarRef(this);
  }

  setValueAsInput(value: number | VarRef) {
    this.value = value;
  }

  setValue(value: number | VarRef) {
    this.actionChain(() => {
      this.value = value;
    });
  }

  setVarName(varName: string) {
    this.actionChain(() => {
      this.varName = varName;
    });
  }

  deleteSelf() {
    if (this.varType === 'global') {
      store.dispatch(deleteGlobalVar(this.id));
      return;
    }
    if (this.varType === 'input') {
      this.funcRef?.refFunc?.config.deleteInputVar(this);
      return;
    }
    if (this.varType === 'local') {
      this.funcRef?.refFunc?.deleteLocalVar(this);
      return;
    }
  }

  actionChain(actions: () => void) {
    actions();
    if (this.varType === 'global') {
      store.dispatch(updateGlobalVar({newVar: this, id: this.id}));
      // saveCurrentImage();
      return;
    }
    if (this.varType === 'input') {
      this.funcRef?.refFunc?.config.updateInputVar(this);
      return;
    }
    if (this.varType === 'local') {
      this.funcRef?.refFunc?.updateLocalVar(this);
      return;
    }
  }
}
