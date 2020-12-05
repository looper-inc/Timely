import * as React from 'react';
import {useState, useEffect, useContext} from 'react'
import { StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import firebase from "../fbconfig"
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../components/PlanScreen/ListItem';

export const followingFeedScreen = ({navigation}) => {
    const [eventsList, setEventsList] = useState(null);
    const[limit, setLimit] = useState(7);
    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState();
    const { currentUser } = useContext(AuthContext);

    const db = firebase.firestore();
    const fStorage = firebase.storage();

    useEffect(() => {
        try {
            retrieveData();
        }
        catch (error) {
            console.log('retrieveData error: ' + error);
        }
    }, []);

    const retrieveData = async () => {
        
        let initialQuery = await db.collection('events')
        .doc(currentUser.uid)
        .collection('list').orderBy('start',"desc").limit(limit);

        initialQuery.onSnapshot((snapshot) => {
            if(snapshot.size){
                setLoading(true);

                let eventList = [];
                snapshot.forEach(item => {
                    eventList.push({...item.data(), id: item.id});
                });

                setTimeout(() => {
                    setEventsList(eventList);
                    setLoading(false);
        
                }, 500);
                
                setLastVisited(last);

            } else {
                setLoading(false);
            }
        });
    }
    
    const retrieveFriendsEvents = async () => {
        let initialQuery = await db.collection('friends_list')
        .doc(currentUser.uid)
        .collection('list').orderBy('start',"desc").limit(limit);

        initialQuery.onSnapshot((snapshot) => {
            if(snapshot.size){

                setIsFetching(true);
                let moreEvents = [...eventsList];
                snapshot.forEach(item => {

                    let friendEvents = await db.collection('events')
                    .doc(item)
                    .collection('list').orderBy('start',"desc").limit(limit);

                    friendEvents.onSnapshot((innerSnapshot) => {
                        if(innerSnapshot.size){
                            setIsFetching(true);
                            innerSnapshot.forEach(innerItem => {
                                moreEvents.push({...innerItem.data(), id: innerItem.id});
                            });
                        }
                    });
                });
            } else {
                console.log('no more row to fetch')
                setIsFetching(false);
            }
        });
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
                renderItem = {({item}) => <ListItem
                    itemDetail={item}
                    onPressDetail={handleDetail}
                    onPressViewDetail = {handleViewDetail}
                />}
                onEndReached = {() =>
                    retrieveFriendsEvents()
                }
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