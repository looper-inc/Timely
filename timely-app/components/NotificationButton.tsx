import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "./Themed";

const windowHeight = Dimensions.get("window").height;

const NotificationButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Ionicons
        style={styles.iconNoti}
        name="ios-notifications-outline"
        size={30}
        color="#f5f6fa"
      />
      <View style={styles.notiContent}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    width: "50%",
    height: windowHeight / 18,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginHorizontal: 1
  },
  notiContent: {
    backgroundColor: "#ED4C67",
    borderRadius: 25 / 2,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 12,
    color: "#f5f6fa",
    fontWeight: "bold"
  },
  iconNoti: {
    marginRight: 5
  }
});
