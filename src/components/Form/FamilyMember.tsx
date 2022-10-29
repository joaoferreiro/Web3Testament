import React, {useRef} from 'react';
import {Text, View, TextInput, Pressable, Alert} from 'react-native';

import {FormFamilyMemberProps} from '../../types';

import {styles} from '../../screens/Setup';

export default ({
  familyMemberIndex,
  inputNameValue,
  setInputNameValue,
  inputAddressValue,
  setInputAddressValue,
  handleAddItem,
  setPhase,
}: FormFamilyMemberProps) => {
  const textInputRef = useRef<TextInput | null>(null);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Recovery family member {familyMemberIndex}
      </Text>
      <View style={styles.textInput}>
        <TextInput
          defaultValue={inputNameValue}
          returnKeyType="next"
          onSubmitEditing={() => textInputRef.current!.focus()}
          onChangeText={(text: string) => setInputNameValue(text)}
          placeholder="New Family Member Name"
          style={styles.inputText}
        />
      </View>
      <View style={[styles.textInput, styles.secondTextInput]}>
        <TextInput
          ref={input => {
            textInputRef.current = input;
          }}
          defaultValue={inputAddressValue}
          returnKeyType="go"
          onSubmitEditing={handleAddItem}
          onChangeText={(text: string) => setInputAddressValue(text)}
          placeholder="New Family Member Adress"
          style={styles.inputText}
        />
      </View>
      <Pressable
        onPress={() => {
          if (familyMemberIndex > 1) {
            setPhase('list');
          } else {
            Alert.alert('Please add at least one contract');
          }
        }}
        style={styles.addButton}>
        <Text style={styles.buttonText}>{'Next'}</Text>
      </Pressable>
    </View>
  );
};
