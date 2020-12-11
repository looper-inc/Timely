import * as React from 'react';
import { useState, useEffect, useContext } from 'react'
import { StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import firebase from "../fbconfig"
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import EventListItem from "../components/FeedScreen/EventListItem"
import GoalListItem from "../components/FeedScreen/GoalListItem";

export const followingFeedScreen = ({ navigation }) => {
    const [eventsList, setEventsList] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const db = firebase.firestore();
    const fStorage = firebase.storage();
    var loading = false
    let goalsList: any[] = [];

    useEffect(() => {
        try {
            retrieveEvents();
        }
        catch (error) {
            console.log('retrieveData error: ' + error);
        }
    }, []);

    const handleEditEvent = itemDetail => {
        navigation.navigate("EditEvent", itemDetail);
    };

    const retrieveEvents = async () => {
        let items: any[] = [];
        let eventsList: any[] = [];
        


        setIsFetching(true)
        let initialQuery = await db.collection('profiles')
            .doc(currentUser.uid)
            .collection('friend_list');

        let userList = [];
        // get friends public events
        initialQuery.onSnapshot((snapshot) => {
            if (snapshot.size) {
                loading = true
                snapshot.forEach(friend => {
                    let fid = friend.data().friend_id;
                    userList.push(fid)
                })

            }


            userList.forEach(user => {
                let tempEvents = db.collection('events')
                    .doc(user)
                    .collection('list')
                    .where('public', '==', true);

                let tempGoals = db.collection('goal')
                    .doc(user)
                    .collection('list')
                    .where('public', '==', true);

                tempEvents.onSnapshot((snap) => {
                    if (snap.size) {
                        snap.forEach(event => {
                            var a = eventsList.push({ ...event.data(), id: event.id, user_id: user });
                            //console.log(eventsList[a-1].id)
                            //console.log(eventsList[a-1].user_id)
                        })
                        setEventsList(eventsList)
                        setIsFetching(false);
                    }
                })

                tempGoals.onSnapshot((snap) => {
                    if (snap.size) {
                        snap.forEach(goal => {
                            var a = goalsList.push({ ...goal.data(), id: goal.id, user_id: user });
                            //console.log(eventsList[a-1].id)
                            //console.log(eventsList[a-1].user_id)
                        })
                    }
                })
            })
            //items = eventsList.concat(goalsList);

        })
    }

    const handleDetail = (itemDetail) => {
        navigation.navigate('EditGoal', itemDetail);
    }

    // const handleViewEventDetail = (itemDetail) => {
    //     console.log('lol')
    //     navigation.navigate('EventDetail', itemDetail);
    // }

    const handleViewGoalDetail = itemDetail => {
        navigation.navigate("GoalDetail", itemDetail);
      };
    const handleRemoveGoal = itemDetail => {}


    return (
        <SafeAreaView style={styles.container}>
            {eventsList ? (
                <>
                    {!loading ? (
                        <>
                            <FlatList
                                data={eventsList}
                                renderItem={({ item }) => (
                                    <EventListItem
                                        itemDetail={item}
                                        onPressDetail={handleEditEvent}
                                        navigation={navigation}
                                    />
                                )}
                            //onEndReached={() => retrieveMoreData()}
                            //onEndReachedThreshold={0.1}
                            />
                        </>
                    ) : (
                            <ActivityIndicator size="large" color="#0097e6" />
                        )}

                    {isFetching && <ActivityIndicator size="large" color="#0097e6" />}
                </>
            ) : (
                    <>
                        {loading && <ActivityIndicator size="large" color="#0097e6" />}
                        {!eventsList && !loading && (
                            <Text style={styles.noDataText}>No Events Available.</Text>
                        )}
                    </>
                )}

            {goalsList ? (
                <>
                    <FlatList
                        data={goalsList}
                        renderItem={({ item }) => (
                            <GoalListItem
                                itemDetail={item}
                                onPressDetail={handleDetail}
                                onPressVewDetail={handleViewGoalDetail}
                                onPressRemoveGoal={handleRemoveGoal}
                            />
                        )}
                        //onEndReached={() => retrieveMoreData()}
                        //onEndReachedThreshold={0.1}
                    />
                    {isFetching && <ActivityIndicator size="large" color="#0097e6" />}
                </>
            ) : (
                    <>
                        {loading && <ActivityIndicator size="large" color="#0097e6" />}
                        {!goalsList && !loading && (
                            <Text style={styles.noDataText}>No Goals Available.</Text>
                        )}
                    </>
                )}
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
    },
    noDataText: {
        fontSize: 16,
        color: "#f5f6fa",
        textTransform: "capitalize",
        fontWeight: "bold",
        alignSelf: "center"
    }
});

export default followingFeedScreen;
