import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Text } from "../Themed";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { upperCaseFirstLetter } from "../../utils/utils";

export const NotificationListItem = ({ itemDetail, onPressVewDetail }) => {
  let message;
  if (itemDetail.type === "inviteToEvent") {
    if (itemDetail.info_from.first_name || itemDetail.info_from.last_name) {
      const fullname =
        upperCaseFirstLetter(itemDetail.info_from.first_name) +
        " " +
        upperCaseFirstLetter(itemDetail.info_from.last_name);
      message = fullname + " has invited you to join an event: ";
    } else {
      message = itemDetail.email_from + " has invited you to join an event: ";
    }
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
            <Text style={styles.title} numberOfLines={3}>
              {message}
            </Text>
            <Text style={styles.titleEvent} numberOfLines={3}>
              {upperCaseFirstLetter(itemDetail.event_title)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonSetting}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => console.log("accept invitation")}
          >
            <AntDesign name="check" size={15} color="#10ac84" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => console.log("cancel invitation")}
          >
            <AntDesign name="close" size={15} color="#ee5253" />
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
    marginHorizontal: 20
  },
  content: {
    paddingLeft: 4,
    margin: 1
  },
  contentText: {
    alignSelf: "flex-start",
    margin: 1,
    width: "85%"
  },
  buttonSetting: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  acceptButton: {
    padding: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 35 / 2,
    borderColor: "#10ac84",
    borderWidth: 2,
    marginVertical: 5,
    marginHorizontal: 20
  },
  cancelButton: {
    padding: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 35 / 2,
    borderColor: "#ee5253",
    borderWidth: 2,
    marginVertical: 5,
    marginHorizontal: 20
  },
  titleComplete: {
    fontSize: 10,
    color: "#34495e",
    fontWeight: "bold"
  }
});

export default NotificationListItem;
