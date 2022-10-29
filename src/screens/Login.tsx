import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';

import {useAppState} from '../contexts/AppContext';

import {ScreenProps} from '../types';

import colors from '../utils/colors';

export default ({navigation}: ScreenProps) => {
  const appState = useAppState();

  const handleLogin = async () => {
    appState.actions.connectWallet();
    checkNeedsSetup();
  };

  const checkNeedsSetup = async () => {
    const setupFinished = await appState.actions.getSetupFinished();
    if (appState.values.account !== '') {
      if (setupFinished) {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('Setup');
      }
    }
  };

  useEffect(() => {
    if (appState.values.account !== '') {
      checkNeedsSetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, styles.mainContainer]}>
      <Text style={styles.titleText}>Welcome to StillHere</Text>
      <Image
        source={require('../../assets/dall_e_log_in.png')}
        style={styles.image}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Connect</Text>
      </Pressable>
      <Pressable onPress={() => null}>
        <Text style={styles.helpButtonText}>Need Help?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 30,
    color: colors.black,
    marginTop: 104,
  },
  image: {
    width: 325,
    height: 325,
    marginTop: 28,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 49,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: '600',
    color: colors.white,
  },
  helpButtonText: {
    marginTop: 16,
    color: colors.primary,
  },
});
