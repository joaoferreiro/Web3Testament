import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button, Alert} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {useAppState} from '../contexts/AppContext';

import {ScreenProps, SetupPhaseType} from '../types';

import FamilyMember from '../components/Form/FamilyMember';
import ListFamily from '../components/Form/ListFamily';
import Periodicity from '../components/Form/Periodicity';
import Video from '../components/Form/Video';

import * as DocumentPicker from 'react-native-document-picker';

import colors from '../utils/colors';

export default ({navigation}: ScreenProps) => {
  const isFocused = useIsFocused();
  const appState = useAppState();

  const [data, setData] = useState<{name: string; address: string}[]>([]);
  const [video, setVideo] =
    useState<DocumentPicker.DocumentPickerResponse | null>(null);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [inputAddressValue, setInputAddressValue] = useState<string>('');
  const [inputNameValue, setInputNameValue] = useState<string>('');
  const [familyMemberIndex, setFamilyMemberIndex] = useState<number>(1);
  const [phase, setPhase] = useState<SetupPhaseType>('family');
  const [pieChartValue, setPieChartValue] = useState<number>(0);

  useEffect(() => {
    if (isFocused) {
      setPhase('family');
    }
  }, [isFocused]);

  const handleGoBack = () => {
    if (phase === 'family') {
      appState.actions.killSession();
      navigation.goBack();
    } else if (phase === 'video') {
      setPhase('periodicity');
    } else if (phase === 'periodicity') {
      setPhase('list');
    } else {
      setPhase('family');
    }
  };

  const handleAddItem = () => {
    if (inputAddressValue !== '' && inputNameValue !== '') {
      setData([...data, {name: inputNameValue, address: inputAddressValue}]);
      setInputAddressValue('');
      setInputNameValue('');
      setFamilyMemberIndex(familyMemberIndex + 1);
    }
  };

  const handleUploadVideo = async () => {
    const selectedFile = await DocumentPicker.pickSingle({
      copyTo: 'documentDirectory',
    });
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

      // const videoIpfsHash = await appState.actions.uploadVideoToIPFS(
      //   fileFormData,
      // );
      // console.log('123', videoIpfsHash);

      setVideoLoading(false);
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
    console.log('data', data);
    console.log('video', video);
    console.log('pieChartValue', pieChartValue);
    // handleSetupRecovery
    navigation.navigate('Profile');
  };

  const handleRender = () => {
    switch (phase) {
      case 'family':
        return (
          <FamilyMember
            familyMemberIndex={familyMemberIndex}
            inputNameValue={inputNameValue}
            setInputNameValue={setInputNameValue}
            inputAddressValue={inputAddressValue}
            setInputAddressValue={setInputAddressValue}
            handleAddItem={handleAddItem}
            setPhase={setPhase}
          />
        );
      case 'list':
        return <ListFamily setPhase={setPhase} data={data} />;
      case 'periodicity':
        return (
          <Periodicity
            pieChartValue={pieChartValue}
            setPieChartValue={setPieChartValue}
            setPhase={setPhase}
          />
        );
      case 'video':
        return (
          <Video
            data={data}
            videoLoading={videoLoading}
            handleUploadVideo={handleUploadVideo}
            handleSetupRecovery={handleSetupRecovery}
          />
        );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backButton}>
        <Button title="Back" onPress={handleGoBack} />
      </View>
      {handleRender()}
    </View>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
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
    marginTop: 74,
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
  secondTextInput: {
    marginTop: 12,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  list: {
    marginTop: 49,
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
  addButton: {
    position: 'absolute',
    bottom: 104,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
  },
  nextButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: colors.background,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  buttonText: {
    fontSize: 16,
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
    top: '50%',
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
