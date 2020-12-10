import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { Text } from "../components/Themed";
import React, { useState, useEffect, useContext } from "react";
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";
import EventListItem from "../components/PlanScreen/EventListItem";
import EventFilter from "./PlanScreen/EventFilter";
import { shuffleData } from "../utils/utils";

export const EventsScreen = ({ navigation }) => {
  const [eventList, setEventList] = useState(null);
  const [limit, setLimit] = useState(7);
  const [isFetching, setIsFetching] = useState(false);
  const [lastVisited, setLastVisited] = useState();
  const [lastVisitedGroup, setLastVisitedGroup] = useState();
  const [loading, setLoading] = useState();
  const [eventFilter, setEventFilter] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const db = firebase.firestore();

  useEffect(() => {
    //clean up useEffect
    let isSubscribed = true;
    if (isSubscribed) {
      try {
        retrieveData(getEventFromGroup, getEventList);
      } catch (error) {
        console.log("retrieveData error: " + error);
      }
    }
    return () => (isSubscribed = false);
  }, [eventFilter]);

  const retrieveData = async (getEventFromGroup, getEventList) => {
    let initialQuery = await db.collection("events").doc(currentUser.uid);
    let events = [];
    switch (eventFilter) {
      case 1:
        getEventList(initialQuery, events);
        break;
      case 2:
        getEventFromGroup(initialQuery, events);
        break;
      case 0:
      default:
        getEventList(initialQuery, events);
        getEventFromGroup(initialQuery, events);
        break;
    }
  };

  const getEventList = (initialQuery, events) => {
    initialQuery
      .collection("list")
      .orderBy("created", "desc")
      //.limit(limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          //set loading
          setLoading(true);

          let count = [];
          snapshot.forEach(item => {
            events.push({
              ...item.data(),
              id: item.id
            });
          });
          //Document ID To Start From For Proceeding Queries
          let last = snapshot.docs[snapshot.docs.length - 1];
          //console.log('visited: ' + last);
          setLastVisited(last);
          //setLoading(false)
        } else {
          setLoading(false);
        }
        setTimeout(() => {
          //console.log(events);

          setEventList(events);
          setLoading(false);
        }, 300);
      });
  };

  const getEventFromGroup = (initialQuery, events) => {
    initialQuery
      .collection("group_list")
      .orderBy("created", "desc")
      //.limit(limit)
      .onSnapshot(snapshot => {
        setLoading(true);
        if (snapshot.size) {
          snapshot.forEach(event => {
            db.collection("events")
              .doc(event.data().uid_event_owner)
              .collection("list")
              .doc(event.data().event_id)
              .get()
              .then(item => {
                //console.log(item.data());
                events.push({
                  ...item.data(),
                  id: item.id,
                  uid_owner: event.data().uid_event_owner
                });
              });
            let last = snapshot.docs[snapshot.docs.length - 1];
            //console.log('visited: ' + last);
            setLastVisitedGroup(last);
          });
        }
        setTimeout(() => {
          setEventList(events);
          setLoading(false);
        }, 300);
      });
  };

  const retrieveMoreData = async () => {
    let initialQuery = await db.collection("events").doc(currentUser.uid);
    let moreEvents = [...eventList];
    switch (eventFilter) {
      case 1:
        getMoreEventList(initialQuery, moreEvents);
        break;
      case 2:
        getMoreEventFromGroup(initialQuery, moreEvents);
        break;
      case 0:
      default:
        getMoreEventList(initialQuery, moreEvents);
        getMoreEventFromGroup(initialQuery, moreEvents);
        break;
    }
  };

  const getMoreEventList = (initialQuery, moreEvents) => {
    initialQuery
      .collection("list")
      .orderBy("created", "desc")
      .startAfter(lastVisited)
      .limit(limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          //set loading
          setIsFetching(true);

          snapshot.forEach(item => {
            //console.log(item.data())
            moreEvents.push({
              ...item.data(),
              id: item.id,
              member_count: snapshot.size
            });
          });

          //console.log(moreEvents);
          setTimeout(() => {
            //set events data to state
            setEventList(moreEvents);
            setIsFetching(false);
          }, 300);

          let last = snapshot.docs[snapshot.docs.length - 1];
          setLastVisited(last);
        } else {
          console.log("no more row to fetch");
          setIsFetching(false);
        }
      });
  };
  const getMoreEventFromGroup = (initialQuery, moreEvents) => {
    initialQuery
      .collection("group_list")
      .orderBy("created", "desc")
      .limit(limit)
      .onSnapshot(snapshot => {
        setLoading(true);
        if (snapshot.size) {
          snapshot.forEach(event => {
            db.collection("events")
              .doc(event.data().uid_event_owner)
              .collection("list")
              .doc(event.data().event_id)
              .get()
              .then(item => {
                //console.log(item.data());
                moreEvents.push({
                  ...item.data(),
                  id: item.id,
                  uid_owner: event.data().uid_event_owner
                });
              });
            let last = snapshot.docs[snapshot.docs.length - 1];
            //console.log('visited: ' + last);
            setLastVisitedGroup(last);
          });
        } else {
          console.log("no more row to fetch");
          setIsFetching(false);
        }
        setTimeout(() => {
          setEventList(moreEvents);
          setLoading(false);
        }, 300);
      });
  };
  const handleEditEvent = itemDetail => {
    navigation.navigate("EditEvent", itemDetail);
  };

  const handleViewDetail = itemDetail => {
    //navigation.navigate("EventDetail", itemDetail);
  };

  const handleRemoveGoal = itemDetail => {
    db.collection("events")
      .doc(currentUser.uid)
      .collection("list")
      .doc(itemDetail.id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  const handleFilter = idx => {
    //console.log("filter pressed", idx);
    setEventFilter(idx);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EventFilter onPressFilter={handleFilter} />
      {eventList ? (
        <>
          {!loading ? (
            <>
              <FlatList
                data={eventList}
                renderItem={({ item }) => (
                  <EventListItem
                    itemDetail={item}
                    onPressDetail={handleEditEvent}
                    onPressViewDetail={handleViewDetail}
                    onPressRemoveEvent={handleRemoveGoal}
                  />
                )}
                //onEndReached={() => retrieveMoreData()}
                //onEndReachedThreshold={0.3}
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
          {!eventList && !loading && (
            <Text style={styles.noDataText}>No Events Available.</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noDataText: {
    fontSize: 16,
    color: "#f5f6fa",
    textTransform: "capitalize",
    fontWeight: "bold",
    alignSelf: "center"
  }
});

export default EventsScreen;
