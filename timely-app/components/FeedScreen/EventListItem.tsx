import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Text } from "../Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  upperCaseFirstLetter,
  getFormattedDateString
} from "../../utils/utils";
import joinEvent from "../../screens/JoinEvent"
import { AuthContext } from "../../providers/AuthProvider";
import firebase from "../../fbconfig";

export const EventListItem = ({
  onPressDetail,
  itemDetail,
  onPressVewDetail,
  onPressRemoveGoal
}) => {

  const { currentUser } = useContext(AuthContext);
  const db = firebase.firestore();
  const [memberCount, setMemberCount] = useState(0);
  const [ownerDetail, setOwnerDetail] = useState();
  useEffect(() => {
    //clean up useEffect
    let isSubscribed = true;
    if (isSubscribed) {
      try {
        getMemberCount(itemDetail);
        getOwnerDetail(itemDetail);
      } catch (error) {
        console.log("retrieve member count error: " + error);
      }
    }
    return () => (isSubscribed = false);
  }, []);

  const getOwnerDetail = async event => {
    if (event.uid_owner) {
      await db
        .collection("profiles")
        .doc(event.uid_owner)
        .get()
        .then(owner => {
          setOwnerDetail(owner.data());
        });
    }
  };
  const getMemberCount = async event => {
    let uid = currentUser.uid;
    let countOwner = 0;
    if (event.uid_owner) {
      //log("owner: ", event.uid_owner))
      uid = event.uid_owner;
      countOwner = 1;
    }
    await db
      .collection("events")
      .doc(uid)
      .collection("list")
      .doc(event.id)
      .collection("members")
      .where("status", "==", "joined")
      .onSnapshot(snapshot => {
        //console.log("newcount: " + event.id, snapshot.size);
        setMemberCount(snapshot.size + countOwner);
      });
  };
  const getUserName = info => {
    let name;
    if (info.first_name || info.last_name) {
      const fullname =
        upperCaseFirstLetter(info.first_name) +
        " " +
        upperCaseFirstLetter(info.last_name);
      name = fullname;
    } else {
      name = info.email;
    }
    return name;
  };
  const createDeleteAlert = () =>
    Alert.alert(
      "Event Delete",
      "Are you sure about this?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "DELETE", onPress: () => console.log("Delete event Pressed") }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.list}>
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={() => onPressVewDetail(itemDetail)}>
          <View style={styles.contentText}>
          {!ownerDetail ? (
              <View style={styles.ownContent}>
                <Text style={styles.ownText}>Own by you</Text>
              </View>
            ) : (
              <View style={styles.ownContent}>
                <Text style={styles.ownerText}>
                  Own by {getUserName(ownerDetail)}
                </Text>
              </View>
            )}
            <Text style={styles.title} numberOfLines={3}>
              {upperCaseFirstLetter(itemDetail.title)}
            </Text>
            <Text style={styles.memberText}>Members: {memberCount}</Text>
            <View style={styles.dateContent}>
              <Text style={styles.titleStart}>
                Start:{"  "}
                {getFormattedDateString(itemDetail.start.toDate())}
              </Text>
              <Text style={styles.titleEnd}>
                End:{"  "}
                {getFormattedDateString(itemDetail.end.toDate())}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonSetting}>
          <TouchableOpacity
            style={styles.joinEventButton}
            onPress={() => {
              console.log("pressed joinEvent")
              joinEvent(itemDetail.user_id,itemDetail.id)
            }}
          >
            <Text>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ecf0f1",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 3
  },

  title: {
    fontSize: 14,
    color: "#2c3e50",
    alignSelf: "flex-start",
    //fontWeight: "bold",
    //height:'60%',
    marginBottom: 3,
    marginTop: 2
  },
  content: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 4,
    backgroundColor: "#ecf0f1",
    margin: 5
  },
  contentText: {
    width: "85%",
    //height: '90%',
    alignSelf: "flex-start",
    margin: 1
  },
  ownContent: {
    flex: 1
  },
  ownText: {
    backgroundColor: "#e58e26",
    fontSize: 9,
    color: "#ecf0f1",
    fontWeight: "bold",
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    alignSelf: "flex-end"
  },
  memberText: {
    fontSize: 12,
    color: "#2c3e50",
    fontWeight: "bold"
  },
  buttonSetting: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  editButton: {
    backgroundColor: "#20bf6b",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginBottom: 4
  },
  removeButton: {
    backgroundColor: "#353b48",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginTop: 4
  },
  dateContent: {
    flex: 1,
    flexDirection: "row"
  },
  titleStart: {
    fontSize: 12,
    color: "#34495e",
    fontWeight: "bold",
    marginRight: 10
  },
  titleEnd: {
    fontSize: 12,
    color: "#34495e",
    fontWeight: "bold",
    marginLeft: 10
  },
  joinEventButton: {
    backgroundColor: "#20bf6b",
    width: 50,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginBottom: 4
  },
  ownerText: {
    backgroundColor: "#192a56",
    fontSize: 9,
    color: "#ecf0f1",
    fontWeight: "bold",
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    alignSelf: "flex-end"
  }
});

export default EventListItem;
