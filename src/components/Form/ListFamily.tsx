import React from 'react';
import {Text, View, FlatList} from 'react-native';

import {styles} from '../../screens/Setup';
import {FormListFamilyMemberProps} from '../../types';

export default ({data}: FormListFamilyMemberProps) => {
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
    </View>
  );
};
