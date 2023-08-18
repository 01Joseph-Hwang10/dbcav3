import {CallFunctionBlock} from '@src/modules/block-definitions/functions/blocks/call-function';
import {VarRef} from '@src/modules/block-definitions/variables/var-ref';
import {Nullable} from '@src/utils/types';

export const displayVarNameHandler = (
  value: Nullable<number | VarRef>,
  placeholder?: boolean | string,
): string => {
  if (!value) {
    if (placeholder)
      return typeof placeholder === 'boolean' ? '변수 없음' : placeholder;
    return '0';
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  return value.varName;
};

export const displayFuncNameHandler = (
  func: Nullable<CallFunctionBlock>,
  placeholder: boolean | string = true,
): string => {
  if (!func) {
    if (placeholder)
      return typeof placeholder === 'boolean' ? '함수 없음' : placeholder;
    return '';
  }
  return func.callback.funcName;
};

export function switchHandler<T = any>(
  bool: Nullable<boolean>,
  on: T,
  off: T,
): T {
  return bool ? on : off;
}
