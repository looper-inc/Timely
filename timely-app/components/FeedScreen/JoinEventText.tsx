import firebase from "../../fbconfig";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Alert,
    TouchableWithoutFeedback
  } from "react-native";
import { bool } from "yup";

const db = firebase.firestore();
var hasJoined = false
var user = firebase.auth().currentUser; // user might be null

export const JoinEventText = async (friend_id, event_id) => {
    try {
        // check if user has already added the event by checking
        // field firend_id, change element.xxx to change identifier
        var members = await db.collection('events').doc(friend_id)
            .collection('list').doc(event_id).collection('members').get()
        const membersId = members.docs.map(doc => doc.data())
        
        membersId.forEach(element => {
            if(element.friend_id == user.uid && element.status == "joined"){
                hasJoined = true
            }
        });
    } catch (error) {
        console.log('join event error', error)
    }
    if(hasJoined){ 
        return("In")
    } else {
        return("Join")   
    }
}