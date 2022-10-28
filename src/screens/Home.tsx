import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// import axios from 'axios';
export default () => {
  useEffect(() => {
    // const sampleRequest = axios.get(
    //   'https://goerli-api.zksync.io/api/v0.2/accounts/1',
    // );
    // console.log(sampleRequest);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text>HomeScreen</Text>
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
