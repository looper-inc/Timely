import * as React from 'react';
import {useState, useEffect, useContext} from 'react'
import { StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import firebase from "../fbconfig"
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import EventListItem from "../components/FeedScreen/EventListItem"

export const followingFeedScreen = ({navigation}) => {
    const [eventsList, setEventsList] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState();
    const { currentUser } = useContext(AuthContext);

    const db = firebase.firestore();
    const fStorage = firebase.storage();

    useEffect(() => {
        try {
            retrieveEvents();
        }
        catch (error) {
            console.log('retrieveData error: ' + error);
        }
    }, []);

    const retrieveEvents = async () => {

        let initialQuery = await db.collection('profiles')
            .doc(currentUser.uid)
            .collection('friend_list');

        let userList = [currentUser.uid];
        
        initialQuery.onSnapshot((snapshot) => {
            if(snapshot.size) {
                setLoading(true);

                snapshot.forEach(friend => {
                    let fid = friend.data().friend_id;
                    userList.push(fid)
                })

            } else {
                console.log('no more rows to feetch')
                setIsFetching(false)
            }
            let eventsList = [];
    
            userList.forEach(user => {
                let tempEvents = db.collection('events')
                    .doc(user)
                    .collection('list')
                    .where('public','==',true);
                
                tempEvents.onSnapshot((snap) => {
                    if(snap.size) {
                        setIsFetching(true);
                        snap.forEach(event => {
                            eventsList.push({...event.data(), id: event.id});
                        })
                        setTimeout(() => {
                            setEventsList(eventsList)
                            setLoading(false)
                        }, 120);
                    } else {
                        console.log('no more rows to fetch')
                        setIsFetching(false);
                    } 
                })
            })
        })
    }

    const handleDetail = (itemDetail) => {
        navigation.navigate('EditGoal', itemDetail);
    }

    const handleViewDetail = (itemDetail) => {
        navigation.navigate('EventDetail', itemDetail);
    }

    return (

        <SafeAreaView style={styles.container}>
            {
                eventsList ?
                <>
                <FlatList
                data = {eventsList}
                renderItem = {({item}) => 
                    <EventListItem
                        itemDetail={item}
                        onPressDetail={handleDetail}
                        onPressViewDetail = {handleViewDetail}
                />}
                onEndReachedThreshold = {0.1}
            />
            {isFetching && <ActivityIndicator size="large" color ="#0097e6" />}
            </> :
            <>
            {loading && <ActivityIndicator size="large" color="#0097e6" />}
            
            </>
            }
        </SafeAreaView>
    );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default followingFeedScreen;
