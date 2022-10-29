import * as React from 'react';
import {ethers} from 'ethers';

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
    retrieveFromIPFS: (ipfsHash: string) => void;
    storeSetupFinished: () => Promise<void>;
    getSetupFinished: () => Promise<boolean>;
    resetSetup: () => Promise<void>;
  };
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export const AppProvider = AppContext.Provider;

export const AppConsumer = AppContext.Consumer;
