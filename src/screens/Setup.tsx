import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScreenProps, SetupPhaseType} from './types';
import {useIsFocused} from '@react-navigation/native';
import CircleSlider from '../components/CircleSlider';
import {useAppState} from '../contexts/AppContext';
import * as DocumentPicker from 'react-native-document-picker';
import colors from '../utils/colors';
import VideoInput from '../components/VideoInput';

export default ({navigation}: ScreenProps) => {
  const isFocused = useIsFocused();
  const appState = useAppState();

  const [data, setData] = useState<string[]>([]);
  const [video, setVideo] =
    useState<DocumentPicker.DocumentPickerResponse | null>(null);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [phase, setPhase] = useState<SetupPhaseType>('first');
  const [pieChartValue, setPieChartValue] = useState<number>(0);

  useEffect(() => {
    if (isFocused) {
      setPhase('first');
    }
  }, [isFocused]);

  const handleGoBack = () => {
    if (phase === 'first') {
      navigation.goBack();
    } else if (phase === 'third') {
      setPhase('second');
    } else {
      setPhase('first');
    }
  };

  const handleAddItem = () => {
    if (inputValue !== '') {
      setData([...data, inputValue]);
      setInputValue('');
    }
  };

  const handleUploadVideo = async () => {
    const selectedFile = await DocumentPicker.pickSingle({
      type: 'video/mp4',
      copyTo: 'documentDirectory',
    });

    console.log(selectedFile);

    setVideo(selectedFile);
  };

  const handleUploadVideoToIpfs = async () => {
    try {
      setVideoLoading(true);
      // 1048576 = 1024 * 1024 = 1MB
      if (video!.size! / 1048576 > 50) {
        Alert.alert(
          'File size is too large. Please select a file less than 35MB',
        );
        setVideoLoading(false);
        return null;
      }

      const fileFormData = new FormData();
      fileFormData.append('file', video);

      const videoIpfsHash = await appState.actions.uploadVideoToIPFS(
        fileFormData,
      );

      setVideoLoading(false);
      console.log('videoIpfsHash', videoIpfsHash);
      setVideo(video);
      setVideoLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (video != null) {
      handleUploadVideoToIpfs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  const handleSetupRecovery = () => {
    // handleSetupRecovery
    navigation.navigate('Profile');
  };

  const listItem = ({item}: {item: string}) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item}</Text>
    </View>
  );

  const firstPhase = (
    <View style={styles.container}>
      <Text style={styles.titleText}>Setup your recovery family</Text>
      <View style={styles.textInput}>
        <TextInput
          returnKeyType="go"
          onSubmitEditing={handleAddItem}
          defaultValue={inputValue}
          onChangeText={(text: string) => setInputValue(text)}
          placeholder="New Family Adress"
          style={styles.inputText}
        />
      </View>
      <View style={styles.list}>
        <FlatList data={data} renderItem={listItem} />
      </View>
      <Pressable onPress={() => setPhase('second')} style={styles.button}>
        <Text style={styles.buttonText}>{'Next'}</Text>
      </Pressable>
    </View>
  );

  const secondPhase = (
    <View style={styles.container}>
      <Text style={styles.titleText}>Warning Periodicity</Text>
      <Text style={styles.secondaryText}>
        From time to time you will need to push the button to prove you are with
        us.
      </Text>
      <View style={styles.slider}>
        <CircleSlider
          btnRadius={22.5}
          dialRadius={120}
          dialWidth={45}
          meterColor={colors.primary}
          fillColor={colors.tertiary}
          textColor={colors.primary}
          onValueChange={(x: number) => setPieChartValue(x * 1)}
          value={pieChartValue}
        />
        <Text style={styles.sliderMainText}>{pieChartValue}</Text>
        <Text style={styles.sliderSecondaryText}>days</Text>
      </View>
      <Pressable onPress={() => setPhase('third')} style={styles.button}>
        <Text style={styles.buttonText}>{'Next'}</Text>
      </Pressable>
    </View>
  );

  const thirdPhase = (
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
        style={[styles.button, data.length === 0 && styles.disabledButton]}>
        <Text style={styles.buttonText}>{'Complete'}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backButton}>
        <Button title="Back" onPress={handleGoBack} />
      </View>
      {phase === 'first'
        ? firstPhase
        : phase === 'second'
        ? secondPhase
        : thirdPhase}
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
  backButton: {
    position: 'absolute',
    top: 55,
    left: 16,
    zIndex: 1,
  },
  titleText: {
    width: 224,
    fontSize: 30,
    marginTop: 55,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.black,
  },
  secondaryText: {
    width: 331,
    fontSize: 16,
    marginTop: 27,
    color: colors.darkGray,
    textAlign: 'center',
  },
  textInput: {
    padding: 16,
    width: '90%',
    marginTop: 29,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.tertiary,
    backgroundColor: colors.lightGray,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  list: {
    marginTop: 18,
    width: '90%',
  },
  listItem: {
    padding: 14,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    position: 'absolute',
    bottom: 50,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: '600',
    color: colors.white,
  },
  disabledButton: {
    backgroundColor: colors.tertiary,
  },
  slider: {
    marginTop: 99,
  },
  sliderMainText: {
    position: 'absolute',
    marginLeft: -100,
    width: 100,
    top: '40%',
    left: '50%',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.primary,
  },
  sliderSecondaryText: {
    position: 'absolute',
    marginLeft: -100,
    width: 100,
    top: '60%',
    left: '50%',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.darkGray,
  },
  videoInput: {
    marginTop: 177,
  },
  activityIndicator: {
    marginTop: 177,
  },
});
