import * as React from 'react';

export interface AppContextInterface {
  values: {
    connector: any;
    account: string;
  };
  actions: {
    setAccount: React.Dispatch<React.SetStateAction<string>>;
    connectWallet: () => void;
    killSession: () => void;
    uploadVideoToIPFS: (data: FormData) => Promise<string>;
    retrieveFromIPFS: (ipfsHash: string) => void;
    resetSetup: () => Promise<void>;
  };
}

export const AppContext = React.createContext<AppContextInterface | null>(null);

export const AppProvider = AppContext.Provider;

export const AppConsumer = AppContext.Consumer;
