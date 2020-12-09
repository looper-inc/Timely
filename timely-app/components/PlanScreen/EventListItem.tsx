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
import {
  upperCaseFirstLetter,
  getFormattedDateString
} from "../../utils/utils";

export const EventListItem = ({
  onPressDetail,
  itemDetail,
  onPressViewDetail,
  onPressRemoveEvent
}) => {
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
        { text: "DELETE", onPress: () => onPressRemoveEvent(itemDetail) }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.list}>
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={() => onPressViewDetail(itemDetail)}>
          <View style={styles.contentText}>
            <View style={styles.ownContent}>
              <Text style={styles.ownText}>Own by you</Text>
            </View>
            <Text style={styles.title} numberOfLines={3}>
              {upperCaseFirstLetter(itemDetail.title)}
            </Text>
            <Text style={styles.memberText}>
              Members: {itemDetail.member_count}
            </Text>
            <View style={styles.dateContent}>
              <Text style={styles.titleStart}>
                Start By:{"  "}
                {getFormattedDateString(itemDetail.start.toDate())}
              </Text>
              <Text style={styles.titleEnd}>
                End By:{"  "}
                {getFormattedDateString(itemDetail.end.toDate())}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonSetting}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onPressDetail(itemDetail)}
          >
            <AntDesign name="edit" size={18} color="#f9fafd" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => createDeleteAlert()}
          >
            <AntDesign name="delete" size={18} color="#f9fafd" />
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
  }
});

export default EventListItem;
