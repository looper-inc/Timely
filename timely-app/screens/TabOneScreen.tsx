import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig"; 
export default function TabOneScreen() {

  function handleSignOut(){
    firebase.auth().signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <FormButton
          buttonTitle="Test Sign Out" onPress={handleSignOut}
        />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.js" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});