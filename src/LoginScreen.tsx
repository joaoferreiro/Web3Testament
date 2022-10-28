import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

export interface ScreenProps {
  navigation: NavigationProp<any, any>;
}

export default ({navigation}: ScreenProps) => {
  return (
    <View style={styles.mainContainer}>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
