import React from 'react';

type ISwitchContext = [boolean, (value: boolean) => void];

export const SwitchContext: React.Context<ISwitchContext> = React.createContext(
  [false, _ => null] as ISwitchContext,
);

export const SwitchCtxProvider = SwitchContext.Provider;
