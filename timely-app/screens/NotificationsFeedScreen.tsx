import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Alert
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";
import NotificationListItem from "../components/FeedScreen/NotificationListItem";

export const NotificationsFeedScreen = ({ navigation }) => {
  const [notificationList, setNotificationList] = useState(null);
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
      .collection("notification")
      .doc(currentUser.uid)
      .collection("member_notify")
      .orderBy("created", "desc")
      .limit(limit);

    initialQuery.onSnapshot(snapshot => {
      if (snapshot.size) {
        //set loading
        setLoading(true);

        let noti = [];
        snapshot.forEach(item => {
          //console.log(item.data());
          return db
            .collection("profiles")
            .doc(item.data().uid_from)
            .get()
            .then(userInfo => {
              noti.push({
                ...item.data(),
                id: item.id,
                info_from: userInfo.data()
              });
            });
        });
        console.log(noti);

        //set goals data to state
        setTimeout(() => {
          setNotificationList(noti);
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

  return (
    <SafeAreaView style={styles.container}>
      {notificationList ? (
        <>
          <FlatList
            data={notificationList}
            renderItem={({ item }) => (
              <NotificationListItem
                itemDetail={item}
                onPressVewDetail={() => console.log("detail click")}
              />
            )}
          />
          {isFetching && <ActivityIndicator size="large" color="#0097e6" />}
        </>
      ) : (
        <>
          {loading && <ActivityIndicator size="large" color="#0097e6" />}
          {!notificationList && !loading && (
            <Text style={styles.noDataText}>No any notification.</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  noDataText: {
    fontSize: 16,
    color: "#f5f6fa",
    textTransform: "capitalize",
    fontWeight: "bold",
    alignSelf: "center"
  }
});
export default NotificationsFeedScreen;
