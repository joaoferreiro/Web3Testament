import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {ScreenProps} from '../types';

// import {useAppState} from '../contexts/AppContext';

import CloseIcon from '../components/icons/Close';

import Video from 'react-native-video';

import colors from '../utils/colors';

export default ({navigation}: ScreenProps) => {
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
        <CloseIcon />
      </Pressable>
      <Video source={{uri: 'background'}} style={styles.backgroundVideo} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.primary,
  },
  icon: {
    position: 'absolute',
    marginLeft: 16,
    marginTop: 65,
  },
  backgroundVideo: {
    marginTop: 237,
    width: '90%',
    height: 200,
    borderRadius: 12,
  },
});
