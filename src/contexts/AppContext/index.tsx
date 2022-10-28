import React, {useContext, useEffect, useState} from 'react';

import {
  AppProvider,
  AppConsumer,
  AppContext,
  AppContextInterface,
} from './context';

// https://goerli-api.zksync.io/api/v0.2/
import {Buffer} from 'buffer';
global.Buffer = global.Buffer || Buffer;

import {ethers} from 'ethers';
import SignClient from '@walletconnect/sign-client';

function AppContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const [signClient, setSignClient] = useState<any>();
  const ethersProvider = ethers.getDefaultProvider('rinkeby');

  const setupSign = async () => {
    SignClient.init({
      projectId: 'ffb95b62b8bb2eb4b75a1fd98a66040a',
      metadata: {
        name: 'Test Wallet',
        description: 'Test Wallet',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
      },
    }).then(result => {
      if (result != null) {
        setSignClient(result);
      }
    });
  };

  useEffect(() => {
    setupSign();
  }, []);

  return (
    <AppProvider
      value={{
        values: {
          ethersProvider,
          signClient,
        },
        actions: {},
      }}>
      {children}
    </AppProvider>
  );
}

function useAppState(): AppContextInterface {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useAppState must be used within an AppContextProvider');
  }
  return context;
}

export {AppContextProvider, AppConsumer, useAppState};
