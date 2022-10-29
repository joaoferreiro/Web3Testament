import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScreenProps} from './types';
import colors from '../utils/colors';

export default ({navigation}: ScreenProps) => {
  return (
    <View style={[styles.container, styles.mainContainer]}>
      <Text style={{color: colors.black}}>Profile</Text>
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
});
