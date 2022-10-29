import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import {ScreenProps, SetupPhaseType} from './types';
import {useIsFocused} from '@react-navigation/native';
import CircleSlider from 'react-native-circle-slider';

import colors from '../utils/colors';

export default ({navigation}: ScreenProps) => {
  const isFocused = useIsFocused();

  const [phase, setPhase] = useState<SetupPhaseType>('second');
  const [inputValue, setInputValue] = useState<string>('');
  const [pieChartValue, setPieChartValue] = useState<number>(0);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    if (isFocused) {
      setPhase('second');
    }
  }, [isFocused]);

  const handleGoBack = () => {
    if (phase === 'first') {
      navigation.goBack();
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
          defaultValue={inputValue}
          onChangeText={(text: string) => setInputValue(text)}
          placeholder="New Family Adress"
          style={styles.inputText}
        />
      </View>
      <View style={styles.list}>
        <FlatList data={data} renderItem={listItem} />
      </View>
      <Pressable onPress={handleAddItem} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );

  const secondPhase = (
    <View style={styles.container}>
      <View style={styles.slider}>
        <CircleSlider value={90} />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backButton}>
        <Button title="Back" onPress={handleGoBack} />
      </View>
      <View style={styles.nextButton}>
        <Button
          title="Next"
          onPress={() => {
            setPhase('second');
          }}
        />
      </View>
      {phase === 'first' ? firstPhase : secondPhase}
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
  nextButton: {
    position: 'absolute',
    top: 55,
    right: 16,
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
  slider: {
    marginTop: '50%',
  },
});
