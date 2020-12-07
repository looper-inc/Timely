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

export const EventsScreen = ({ navigation }) => {
  const [eventList, setEventList] = useState(null);
  const [limit, setLimit] = useState(7);
  const [isFetching, setIsFetching] = useState(false);
  const [lastVisited, setLastVisited] = useState();
  const [loading, setLoading] = useState();
  const { currentUser } = useContext(AuthContext);

  const db = firebase.firestore();

  useEffect(() => {
    try {
      retrieveData();
    } catch (error) {
      console.log("retrieveData error: " + error);
    }
  }, []);

  const retrieveData = async () => {
    let initialQuery = await db
      .collection("events")
      .doc(currentUser.uid)
      .collection("list")
      .orderBy("created", "desc")
      .limit(limit);

    initialQuery.onSnapshot(snapshot => {
      if (snapshot.size) {
        //set loading
        setLoading(true);

        let events = [];
        snapshot.forEach(item => {
          events.push({ ...item.data(), id: item.id });
        });
        //console.log events);
        //set events data to state
        setTimeout(() => {
          setEventList(events);
          setLoading(false);
        }, 500);
        //Cloud Firestore: Last Visible Document
        //Document ID To Start From For Proceeding Queries
        let last = snapshot.docs[snapshot.docs.length - 1];
        //console.log('visited: ' + last);
        setLastVisited(last);
        //setLoading(false)
      } else {
        setLoading(false);
      }
    });
  };
  const retrieveMoreData = async () => {
    let initialQuery = await db
      .collection("events")
      .doc(currentUser.uid)
      .collection("list")
      .orderBy("created", "desc")
      .startAfter(lastVisited)
      .limit(limit);

    initialQuery.onSnapshot(snapshot => {
      if (snapshot.size) {
        //set loading
        setIsFetching(true);
        let moreEvents = [...eventList];
        snapshot.forEach(item => {
          //console.log(item.data())
          moreEvents.push({ ...item.data(), id: item.id });
        });
        //console.log(moreEvents);
        setTimeout(() => {
          //set events data to state
          setEventList(moreEvents);
          setIsFetching(false);
        }, 500);

        let last = snapshot.docs[snapshot.docs.length - 1];
        setLastVisited(last);
      } else {
        console.log("no more row to fetch");
        setIsFetching(false);
      }
    });
  };

  const handleEditEvent = itemDetail => {
    navigation.navigate("EditEvent", itemDetail);
  };

  const handleViewDetail = itemDetail => {
    //navigation.navigate("EventDetail", itemDetail);
  };

  const handleRemoveGoal = itemDetail => {
    // db.collection("events")
    //   .doc(currentUser.uid)
    //   .collection("list")
    //   .doc(itemDetail.id)
    //   .delete()
    //   .then(function() {
    //     console.log("Document successfully deleted!");
    //   })
    //   .catch(function(error) {
    //     console.error("Error removing document: ", error);
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <EventFilter
        onPressAll={() => console.log("all pressed")}
        onPressByYou={() => console.log("by you pressed")}
        onPressByOther={() => console.log("by other pressed")}
      />
      {eventList ? (
        <>
          <FlatList
            data={eventList}
            renderItem={({ item }) => (
              <EventListItem
                itemDetail={item}
                onPressDetail={handleEditEvent}
                onPressVewDetail={handleViewDetail}
                onPressRemoveGoal={handleRemoveGoal}
              />
            )}
            onEndReached={() => retrieveMoreData()}
            onEndReachedThreshold={0.1}
          />
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
    //justifyContent: "center"
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
