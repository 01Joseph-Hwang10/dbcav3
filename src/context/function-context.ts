import React from 'react';

type Callback = () => void;

export const CallbackContext: React.Context<Callback> =
  React.createContext<Callback>(() => null);

export const CallbackCtxProvider = CallbackContext.Provider;
