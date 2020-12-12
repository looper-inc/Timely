import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import firebase from "../fbconfig";
import { SafeAreaView } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import EventListItem from "../components/FeedScreen/EventListItem";
import FollowingFilter from "../components/FeedScreen/FollowingFilter";

export const FollowingFeedScreen = ({ navigation }) => {
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [eventFilter, setEventFilter] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const db = firebase.firestore();
  const fStorage = firebase.storage();

  useEffect(() => {
    try {
      retrieveEvents();
    } catch (error) {
      console.log("retrieveData error: " + error);
    }
  }, []);

  const retrieveEvents = async () => {
    let eventsList: any[] = [];

    setIsFetching(true);
    let initialQuery = await db
      .collection("profiles")
      .doc(currentUser.uid)
      .collection("friend_list")
      .where("pending", "==", false);

    let userList = [currentUser.uid];

    initialQuery.onSnapshot(snapshot => {
      if (snapshot.size) {
        snapshot.forEach(user => {
          let tempEvents = db
            .collection("events")
            .doc(user.data().friend_id)
            .collection("list")
            .where("public", "==", true);

          //get friend's info
          db.collection("profiles")
            .doc(user.data().friend_id)
            .get()
            .then(info => {
              tempEvents.onSnapshot(snap => {
                if (snap.size) {
                  snap.forEach(event => {
                    eventsList.push({
                      ...event.data(),
                      id: event.id,
                      friend_id: user.data().friend_id,
                      friend_info: info.data()
                    });
                    //console.log(eventsList[a-1].id)
                    //console.log(eventsList[a-1].user_id)
                  });
                }
              });
              setTimeout(() => {
                setEventsList(eventsList);
                setIsFetching(false);
              }, 300);
            });
        });
      }
    });
  };

  const handleDetail = itemDetail => {
    navigation.navigate("EditGoal", itemDetail);
  };

  const handleViewDetail = itemDetail => {
    console.log("lol");
    navigation.navigate("EventDetail", itemDetail);
  };
  const handleFilter = idx => {
    //console.log("filter pressed", idx);
    setEventFilter(idx);
  };
  if (eventsList)
    return (
      <SafeAreaView style={styles.container}>
        {/* <FollowingFilter onPressFilter={handleFilter} /> */}
        <FlatList
          data={eventsList}
          renderItem={({ item }) => (
            <EventListItem
              itemDetail={item}
              onPressDetail={handleDetail}
              onPressVewDetail={handleViewDetail}
            />
          )}
        />
        {isFetching && <ActivityIndicator size="large" color="#0097e6" />}
      </SafeAreaView>
    );
  else
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0097e6" />
      </SafeAreaView>
    );
};

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

export default FollowingFeedScreen;
