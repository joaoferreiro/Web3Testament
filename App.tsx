import React from 'react';

import {AppContextProvider} from './src/contexts/AppContext';

import Routes from './src/routes';

const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {withWalletConnect} = require('@walletconnect/react-native-dapp');

const App = () => {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
};

export default withWalletConnect(App, {
  redirectUrl: 'web3testament://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
