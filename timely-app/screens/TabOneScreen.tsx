import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig"; 
export default function TabOneScreen() {

  // const db = firebase.firestore();
  // async function handleGet(){
  //   const snapshot = await db.collection("profiles").get();
  //   snapshot.forEach(doc => {
  //     console.log("User ID: " + doc.id);
  //     console.log(doc.data());
  //   });
  // }

  function handleSignOut(){
    firebase.auth().signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <FormButton buttonTitle="Test Sign Out" onPress={handleSignOut}/>
      {/* <FormButton buttonTitle="Get all profiles" onPress={handleGet}/> */}
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
