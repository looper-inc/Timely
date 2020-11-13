import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";


export default class NewEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Insert Form Here</Text>
      </View>
    );
  }
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
