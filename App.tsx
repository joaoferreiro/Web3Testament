import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// https://goerli-api.zksync.io/api/v0.2/

import '@walletconnect/react-native-compat';
import '@ethersproject/shims';

import {Buffer} from 'buffer';
global.Buffer = global.Buffer || Buffer;
global.TextDecoder = global.TextDecoder || TextDecoder;
import {ethers} from 'ethers';

import SignClient from '@walletconnect/sign-client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';

const App = () => {
  const setup = async () => {
    const ethersProvider = ethers.getDefaultProvider('rinkeby');
    const signClient = await SignClient.init({
      projectId: 'ffb95b62b8bb2eb4b75a1fd98a66040a',
      metadata: {
        name: 'Test Wallet',
        description: 'Test Wallet',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
      },
    });
    console.log('ethersProvider', ethersProvider);
    console.log('signClient', signClient);
  };
  useEffect(() => {
    setup();
  });

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
