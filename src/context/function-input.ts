import {Nullable} from '@src/utils/types';
import React from 'react';

export interface IFunctionInputContext {
  includeIterator?: boolean;
}

/**
 * @description Currently iterator for 'for' command does not implemented. Use the context when it is implemented.
 */
export const FunctionInputContext: React.Context<
  Nullable<IFunctionInputContext>
> = React.createContext<Nullable<IFunctionInputContext>>(null);

export const FunctionInputCtxProvider = FunctionInputContext.Provider;
