import {FunctionBlock} from './functions/function';
import {VarBlock} from './variables/variable';
import {AssignBlock} from './functions/blocks/assign';
import {ForBlock} from './functions/blocks/for';
import {FuncRef} from './functions/func-ref';
import {IfBlock} from './functions/blocks/if';
import {MotorBlock} from './functions/blocks/motor';
import {VarRef} from './variables/var-ref';
import {WaitBlock} from './functions/blocks/wait';
import {CallFunctionBlock} from './functions/blocks/call-function';
import {EndBlock} from './functions/blocks/end';
import {PropertyBlock} from './classes/blocks/property';
import {MethodBlock} from './classes/blocks/method';

export type KeywordBlock =
  | AssignBlock
  | ForBlock
  | IfBlock
  | MotorBlock
  | CallFunctionBlock
  | WaitBlock
  | EndBlock;

export type OOPBlock = PropertyBlock | MethodBlock;

export type WorkspaceBlock =
  | KeywordBlock
  | OOPBlock
  | FunctionBlock
  | VarBlock
  | FuncRef
  | VarRef;
