import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

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
      <Video
        source={{
          uri: 'https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4',
        }}
        style={styles.backgroundVideo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.primary,
  },
  icon: {
    position: 'absolute',
    left: 16,
    top: 65,
  },
  backgroundVideo: {
    marginTop: 237,
    width: '90%',
    height: 200,
    borderRadius: 12,
  },
});
