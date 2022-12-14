import React, {useContext, useEffect, useState} from 'react';

import {
  AppProvider,
  AppConsumer,
  AppContext,
  AppContextInterface,
} from './context';

import {useWalletConnect} from '@walletconnect/react-native-dapp';

import AsyncStorage from '@react-native-async-storage/async-storage';

function AppContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const connector = useWalletConnect();
  const [account, setAccount] = useState<string>('');

  useEffect(() => {
    if (connector.connected && connector.accounts != null) {
      setAccount(connector.accounts[0]);
    }
  }, [connector]);

  const connectWallet = React.useCallback(() => {
    connector.connect().then((res: any) => {
      setAccount(res.accounts[0]);
    });
  }, [connector]);

  const killSession = React.useCallback(() => {
    connector.killSession();
    setAccount('');
  }, [connector]);

  const uploadVideoToIPFS = (data: FormData) => {
    return fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: 'cbb83f28efc6be9a93f9',
        pinata_secret_api_key:
          '51451ec08fce0c174ab0dddd495b7234d3e3f2c6e495900c172d1d6a5bbad099',
        'content-type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())
      .then(responseJson => {
        return `ipfs://${responseJson.IpfsHash}`;
      });
  };

  const retrieveFromIPFS = (ipfsHash: string) => {
    return fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`, {
      method: 'GET',
      headers: {
        pinata_api_key: 'cbb83f28efc6be9a93f9',
        pinata_secret_api_key:
          '51451ec08fce0c174ab0dddd495b7234d3e3f2c6e495900c172d1d6a5bbad099',
        'content-type': 'multipart/form-data',
      },
    });
  };

  const resetSetup = async () => {
    await AsyncStorage.removeItem('testamint');
    await AsyncStorage.removeItem('video');
  };

  return (
    <AppProvider
      value={{
        values: {
          account,
          connector,
        },
        actions: {
          setAccount,
          killSession,
          connectWallet,
          retrieveFromIPFS,
          uploadVideoToIPFS,
          resetSetup,
        },
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
