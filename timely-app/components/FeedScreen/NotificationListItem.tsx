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
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { upperCaseFirstLetter } from "../../utils/utils";

export const NotificationListItem = ({
  itemDetail,
  onPressVewDetail,
  handleAcceptedEvent,
  getUserName
}) => {
  let message;
  //const [acceptedEvent, setAcceptedEvent] = useState(false);
  let acceptedEvent;
  switch (itemDetail.type) {
    case "inviteToEvent":
      const name = getUserName(itemDetail);
      message = name + " has invited you to join an event: ";
      break;
    case "joinEvent":
      break;
    case "acceptedEvent":
      acceptedEvent = true;
      message = itemDetail.message;
      break;
    case "declinedEvent":
      break;
    case "confirmation":
      acceptedEvent = true;
      message = itemDetail.message;
      break;
    default:
      break;
  }

  return (
    <View style={styles.list}>
      <TouchableWithoutFeedback onPress={() => onPressVewDetail(itemDetail)}>
        {itemDetail.info_from.profileImgURL ? (
          <Image
            source={{ uri: itemDetail.info_from.profileImgURL }}
            style={styles.defaultPic}
          />
        ) : (
          <View style={styles.defaultPic}>
            <AntDesign name="user" size={30} color="#666" />
          </View>
        )}
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={() => onPressVewDetail(itemDetail)}>
          <View style={styles.contentText}>
            <Text style={styles.title} numberOfLines={2}>
              {message}
            </Text>
            <Text style={styles.titleEvent} numberOfLines={3}>
              {upperCaseFirstLetter(itemDetail.event_title)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonSetting}>
          {!acceptedEvent ? (
            <>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptedEvent(itemDetail)}
              >
                <Text style={styles.acceptText}>
                  <AntDesign name="check" size={11} color="#10ac84" /> Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => console.log("cancel invitation")}
              >
                <Text style={styles.cancelText}>
                  <AntDesign name="close" size={11} color="#ee5253" /> Decline
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => console.log("done invitation")}
            >
              <Text style={styles.cancelText}>
                <AntDesign name="close" size={11} color="#ee5253" /> Done
              </Text>
            </TouchableOpacity>
          )}
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
    borderRadius: 3,
    paddingVertical: 5
  },

  title: {
    fontSize: 12,
    color: "#2c3e50",
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 3,
    marginTop: 2
  },
  titleEvent: {
    fontSize: 13,
    color: "#2c3e50"
  },
  defaultPic: {
    backgroundColor: "#dcdde1",
    height: windowHeight / 10,
    width: windowHeight / 10,
    borderColor: "#ccc",
    borderRadius: windowHeight / 10 / 2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 15
  },
  content: {
    flex: 1,
    paddingLeft: 4,
    margin: 1
  },
  contentText: {
    //margin: 1,
    //backgroundColor: "#4cd137"
  },
  buttonSetting: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5
    //backgroundColor: "#e1b12c"
  },
  acceptText: {
    color: "#10ac84",
    fontSize: 10
  },
  cancelText: {
    color: "#ee5253",
    fontSize: 10
  },
  acceptButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#10ac84",
    borderWidth: 1,
    marginHorizontal: 10
  },
  cancelButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#ee5253",
    borderWidth: 1,
    marginHorizontal: 10
  },
  titleComplete: {
    fontSize: 10,
    color: "#34495e",
    fontWeight: "bold"
  }
});

export default NotificationListItem;
