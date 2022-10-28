/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import '@walletconnect/react-native-compat';
import '@ethersproject/shims';

AppRegistry.registerComponent(appName, () => App);
