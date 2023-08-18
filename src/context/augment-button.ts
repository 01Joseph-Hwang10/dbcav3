import {Nullable} from '@src/utils/types';
import React from 'react';
import {Directions} from 'react-native-gesture-handler';

export interface IAugmentButtonContext {
  direction?: Nullable<Directions>;
  setDirection?: (direction?: Nullable<Directions>) => void;
}

export const AugmentButtonContext: React.Context<IAugmentButtonContext> =
  React.createContext({
    direction: null,
    setDirection: _ => null,
  } as IAugmentButtonContext);

export const AugmentButtonCtxProvider = AugmentButtonContext.Provider;
