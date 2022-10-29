import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import SetupScreen from '../screens/Setup';
import ProfileScreen from '../screens/Profile';

export default () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
