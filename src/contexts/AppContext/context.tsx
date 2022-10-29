import {ethers} from 'ethers';
import * as React from 'react';

export interface AppContextInterface {
  values: {
    connector: any;
    account: string;
    ethersProvider: ethers.providers.BaseProvider;
  };
  actions: {
    setAccount: React.Dispatch<React.SetStateAction<string>>;
    connectWallet: () => void;
    killSession: () => void;
    uploadVideoToIPFS: (data: FormData) => void;
  };
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export const AppProvider = AppContext.Provider;

export const AppConsumer = AppContext.Consumer;
