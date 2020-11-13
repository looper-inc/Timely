import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import EventBlock from '../components/EventBlock';
import firebase from "../fbconfig";
import { events12 } from '../constants/DummyData'
import { FlatList } from 'react-native-gesture-handler';


export default class EventsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut() {
    firebase.auth().signOut();
  }

  renderItem = ({ item }) => {
    return <EventBlock event={item} />
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          data={events12}
          renderItem={this.renderItem}
          keyExtractor={event => event.event_id}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
