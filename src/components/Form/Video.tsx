import React from 'react';
import {Text, View, Pressable, ActivityIndicator} from 'react-native';
import VideoInput from '../icons/VideoInput';
import {styles} from '../../screens/Setup';
import {FormVideoProps} from '../../types';

export default ({
  data,
  videoLoading,
  handleUploadVideo,
  handleSetupRecovery,
}: FormVideoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Record a message</Text>
      <Text style={styles.secondaryText}>
        You can record a video in order to share a message with your recovery
        family.
      </Text>
      {videoLoading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <>
          <Pressable style={styles.videoInput} onPress={handleUploadVideo}>
            <VideoInput />
          </Pressable>
        </>
      )}
      <Pressable
        disabled={data.length === 0}
        onPress={handleSetupRecovery}
        style={[styles.addButton, data.length === 0 && styles.disabledButton]}>
        <Text style={styles.buttonText}>{'Complete'}</Text>
      </Pressable>
    </View>
  );
};
