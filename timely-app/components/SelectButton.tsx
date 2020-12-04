import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const SelectButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default SelectButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "50%",
    height: windowHeight / 15,
    backgroundColor: "#2e64e5",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginHorizontal: 2
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff"
  }
});
