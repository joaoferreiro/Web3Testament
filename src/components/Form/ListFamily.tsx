import React from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';

import {FormListFamilyMemberProps} from '../../types';

import {styles} from '../../screens/Setup';

export default ({data, setPhase}: FormListFamilyMemberProps) => {
  const listItem = ({item}: {item: string}) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Setup your recovery family</Text>
      <View style={styles.list}>
        <FlatList
          data={data.map((item: {name: string; address: string}) => item.name)}
          renderItem={listItem}
        />
      </View>
      <Pressable
        onPress={() => {
          setPhase('periodicity');
        }}
        style={styles.addButton}>
        <Text style={styles.buttonText}>{'Next'}</Text>
      </Pressable>
    </View>
  );
};
