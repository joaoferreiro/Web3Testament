import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useAppState} from '../contexts/AppContext';

import {ScreenProps} from '../types';

import Modal from 'react-native-modal';

import mockImages from '../utils/mockImages';
import {trimHash} from '../utils/hash';

import colors from '../utils/colors';

export default ({navigation}: ScreenProps) => {
  const appState = useAppState();

  const [selectedTab, setSelectedTab] = useState<boolean>(false);
  const [modalShown, setModalShown] = useState<boolean>(true);
  const [userHasVideo] = useState<boolean>(true);

  const [yourRecoveryData] = useState<string[]>([
    '0xa3A5Ef800b47D503E61EE7f0bAF7Ee80BCC5fbFb',
    '0xa3A5Ef800b47D503E61EE7f0bAF7Ee80BCC5fbFb',
    '0xa3A5Ef800b47D503E61EE7f0bAF7Ee80BCC5fbFb',
  ]);
  const [otherRecoveryData] = useState<string[]>([
    '0xa3A5Ef800b47D503E61EE7f0bAF7Ee80BCC5fbFb',
    '0xa3A5Ef800b47D503E61EE7f0bAF7Ee80BCC5fbFb',
    '0xa3A5Ef800b47D503E61EE7f0bAF7Ee80BCC5fbFb',
  ]);

  const handleStillAlive = () => {
    // still alive
    setModalShown(false);
  };

  const listItem = ({item, index}: {item: string; index: number}) => (
    <View style={styles.listItemContainer}>
      <Image style={styles.recoveryPicture} source={mockImages(index)} />
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={[styles.container, styles.mainContainer]}>
      <View style={styles.settingsButton}>
        <Button title="Settings" color={colors.white} onPress={() => null} />
      </View>
      <View style={styles.logoutButton}>
        <Button
          title="Logout"
          color={colors.white}
          onPress={() => {
            appState.actions.killSession();
            // appState.actions.resetSetup();
            navigation.navigate('Login');
          }}
        />
      </View>
      <View style={styles.topContainer} />
      <TouchableOpacity
        disabled={!userHasVideo}
        onPress={() => {
          navigation.navigate('Video');
        }}>
        <Image
          style={styles.profilePicture}
          source={
            userHasVideo
              ? require('../../assets/bayc_placeholder_2.png')
              : require('../../assets/bayc_placeholder.png')
          }
        />
      </TouchableOpacity>
      <Text style={styles.addressText}>
        {trimHash('0xa3A5Ef800b47D503E61EE7f0bAF7Ee80BCC5fbFb')}
      </Text>
      <View style={styles.selectTabs}>
        <Pressable
          onPress={() => setSelectedTab(false)}
          style={selectedTab ? styles.unselectedTab : styles.selectedTab}>
          <Text
            style={[
              styles.tabText,
              selectedTab ? styles.unselectedTabText : styles.selectedTabText,
            ]}>
            Your Recovery
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab(true)}
          style={selectedTab ? styles.selectedTab : styles.unselectedTab}>
          <Text
            style={[
              styles.tabText,
              selectedTab ? styles.selectedTabText : styles.unselectedTabText,
            ]}>
            Other Recoveries
          </Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.listContainer}
        data={selectedTab ? yourRecoveryData : otherRecoveryData}
        renderItem={listItem}
      />
      <Modal isVisible={modalShown}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Are you still with us?</Text>
          <Text style={styles.modalText}>
            Let us know if you are still alive by clicking the button bellow.
          </Text>
          <Pressable onPress={handleStillAlive} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Still here</Text>
          </Pressable>
        </View>
      </Modal>
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
  settingsButton: {
    position: 'absolute',
    top: 55,
    left: 16,
    zIndex: 1,
    color: colors.white,
  },
  logoutButton: {
    position: 'absolute',
    top: 55,
    right: 16,
    zIndex: 1,
    color: colors.white,
  },
  topContainer: {
    height: '30%',
    width: '100%',
    backgroundColor: colors.primary,
  },
  profilePicture: {
    marginTop: -150,
    width: 158,
    zIndex: 1000,
  },
  addressText: {
    fontSize: 30,
    marginTop: 57,
    maxWidth: 256,
    fontWeight: '600',
  },
  selectTabs: {
    flexDirection: 'row',
    height: 50,
    width: '90%',
    marginTop: 51,
    borderRadius: 100,
    backgroundColor: colors.tertiary,
  },
  selectedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    marginTop: 2,
    marginLeft: 2,
    width: '49.5%',
    borderRadius: 100,
    backgroundColor: colors.white,
  },
  unselectedTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    marginTop: 2,
    width: '49.5%',
    borderRadius: 100,
    backgroundColor: colors.tertiary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedTabText: {
    color: colors.primary,
  },
  unselectedTabText: {
    color: colors.darkGray,
  },
  listContainer: {
    width: '90%',
  },
  listItemContainer: {
    width: '100%',
    height: 63,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  recoveryPicture: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 10,
    marginLeft: 16,
    fontWeight: '500',
    color: colors.black,
  },
  modalContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 268,
    width: '90%',
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  modalTitle: {
    fontSize: 24,
    marginTop: 64,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.black,
  },
  modalText: {
    fontSize: 16,
    maxWidth: 300,
    marginTop: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.darkGray,
  },
  modalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 49,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
