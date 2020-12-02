import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Alert, Text } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import firebase from "../fbconfig"
import EventBlock from '../components/EventBlock';
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';


export default class FollowingFeedScreen extends React.Component<{}, { following_events_list: Array<Object> }>{
    constructor(props) {
        super(props)
        this.state = {
            following_events_list: []
        }
    }


    // Access auth
    static contextType = AuthContext

    componentDidMount() {
        this.getFollowingEvents()
    }

    getFollowingEvents() {
        const { uid } = this.context.currentUser
        const db = firebase.firestore();
        const { following_uids } = db.collection('friends').doc(uid).collection('list').get()

        // Getting correct document
        return db.collection('events').doc( following_uids ).collection('list').get()
            .then(docs => {
                const following_events_list = []
                docs.forEach(doc => {
                    events_list.push(doc.data())
                })
                this.setState(
                    { following_events_list },
                    () => {console.log(this.state) }
                )
            })
            // Handle errors
            .catch(function (err) {
                Alert.alert('OOPS!', err.message, [{ text: 'close' }])
                console.log(err)
            });
    }

    renderItem = ({ item }) => {
        return <EventBlock event={item} />
    }

    render() {
        return (
            <SafeAreaView style={StyleSheet.container}>
                <FlatList
                    style={{ width: '100%' }}
                    data={this.state.following_events_list}
                    renderItem={this.renderItem}
                    keyExtractor={event => event[0]}
                />
            </SafeAreaView>
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