import {ethers} from 'ethers';
import * as React from 'react';

export interface AppContextInterface {
  values: {
    ethersProvider: ethers.providers.BaseProvider;
    signClient: any;
  };
  actions: {};
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export const AppProvider = AppContext.Provider;

export const AppConsumer = AppContext.Consumer;
