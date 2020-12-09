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
import { upperCaseFirstLetter } from "../utils/utils";

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
    //set loading
    setLoading(true);
    let initialQuery = await db
      .collection("notification")
      .doc(currentUser.uid)
      .collection("member_notify")
      .orderBy("created", "desc")
      .limit(limit);

    initialQuery.onSnapshot(snapshot => {
      if (snapshot.size) {
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
        //console.log(noti);

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

  const handleAcceptedEvent = async noti => {
    console.log(noti);
    await db
      .collection("events")
      .doc(noti.uid_from)
      .collection("list")
      .doc(noti.event_id)
      .collection("members")
      .doc(noti.member_id)
      .update({ status: "joined" })
      .then(() => {
        //add group event id into events collection for who is invited
        db.collection("events")
          .doc(noti.uid_to)
          .collection("group_list")
          .doc(noti.event_id)
          .set({
            created: Date.now(),
            event_id: noti.event_id
          })
          .then(() => {
            console.log("add group event successfully");
            //update current notification
            db.collection("notification")
              .doc(currentUser.uid)
              .collection("member_notify")
              .doc(noti.id)
              .update({
                type: "acceptedEvent",
                message: "You've now joined " + getUserName(noti) + " event:",
                status: "done"
              })
              .then(() => {
                //send other notification to owner to confirm
                const mes = " has joined your event: ";
                const confirmation = {
                  created: Date.now(),
                  type: "confirmation",
                  uid_from: currentUser.uid,
                  email_from: currentUser.email,
                  uid_to: noti.uid_from,
                  message: mes,
                  event_id: noti.event_id,
                  event_title: noti.event_title,
                  status: "pending",
                  member_id: noti.member_id
                };
                db.collection("notification")
                  .doc(noti.uid_from)
                  .collection("member_notify")
                  .add(confirmation);
              });
          });
      })
      .then(result => {
        console.log("update member is ok");
      })
      .catch(error => {
        console.log("add member error", error);
      });
  };

  const handleDeclinedEvent = async noti => {
    await db
      .collection("events")
      .doc(noti.uid_from)
      .collection("list")
      .doc(noti.event_id)
      .collection("members")
      .doc(noti.member_id)
      .delete()
      .then(() => {
        //delete current notification
        db.collection("notification")
          .doc(currentUser.uid)
          .collection("member_notify")
          .doc(noti.id)
          .delete()
          .then(() => {
            //send declined notification to owner
            const mes = getUserName(noti) + " has declined your invitation: ";
            const confirmation = {
              created: Date.now(),
              type: "declinedEvent",
              uid_from: currentUser.uid,
              email_from: currentUser.email,
              uid_to: noti.uid_from,
              message: mes,
              event_id: noti.event_id,
              event_title: noti.event_title,
              status: "done",
              member_id: noti.member_id
            };
            db.collection("notification")
              .doc(noti.uid_from)
              .collection("member_notify")
              .add(confirmation);
          });
      });
  };

  const handleDone = async noti => {
    await db;
    db.collection("notification")
      .doc(currentUser.uid)
      .collection("member_notify")
      .doc(noti.id)
      .delete()
      .then(() => {
        console.log("deleted notification successfully");
      });
  };

  const getUserName = info => {
    let name;
    if (info.info_from.first_name || info.info_from.last_name) {
      const fullname =
        upperCaseFirstLetter(info.info_from.first_name) +
        " " +
        upperCaseFirstLetter(info.info_from.last_name);
      name = fullname;
    } else {
      name = info.info_from.email;
    }
    return name;
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
                handleAcceptedEvent={handleAcceptedEvent}
                getUserName={getUserName}
                handleDone={handleDone}
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
