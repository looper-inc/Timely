import firebase from "../fbconfig";
import {
    Alert
  } from "react-native";

const JoinEvent = async (friend_id, event_id) => {
    var db
    db = firebase.firestore()
    var user = firebase.auth().currentUser; // user might be null
    var hasJoined = false

    try {
        // check if user has already added the event by checking
        // field firend_id, change element.xxx to change identifier
        var members = await db.collection('events').doc(friend_id)
            .collection('list').doc(event_id).collection('members').get()
        const membersId = members.docs.map(doc => doc.data())
        //var hasJoined = false
        
        membersId.forEach(element => {
            if(element.friend_id == user.uid && element.status == "joined"){
                hasJoined = true
            }
        });
        if(hasJoined){ 
            console.log("You already Joined")
            // Need to pop up a window
            Alert.alert("You are already in, have fun!")
            //tag, ract component, alert, modal
        } else {
            //add my id to the partisapant list
            // NOTE: if you need to change the format of partisapant id,
            // content in the .add need to be changed with
            db.collection('events').doc(friend_id)
                .collection('list').doc(event_id).collection('members')
                .add({friend_id: user.uid, status: "pending"});
            //get partisapant list
            members = await db.collection('events').doc(friend_id)
                .collection('list').doc(event_id).collection('members').get()
            const membersId = members.docs.map(doc => doc.data())
            //get event
            db.collection('events').doc(friend_id)
                .collection('list').doc(event_id).get().then((doc) => {
                var data
                data = doc.data()
                // create and push notification
                const noti_data = {
                    created: Date.now(),
                    type: "inviteToEvent",
                    uid_from: user.uid,
                    email_from: user.email,
                    uid_to: friend_id,
                    message: "",
                    event_id: event_id,
                    event_title: data.title,
                    status: "pending"
                  };

                db.collection("notification").doc(friend_id)
                  .collection("member_notify").add(noti_data)
                  .then(() => {
                    console.log("added notification successfully");
                  });
                
                Alert.alert("Join Request Send", "waiting for owner's response")
                // //write event
                // db.collection('events').doc(user.uid).
                // collection('list').add(data).then((dataRef) => {
                //     membersId.forEach(element => {
                //         db.collection('events').doc(user.uid).collection('list')
                //         .doc(dataRef.id).collection('members').add(element)
                //     });
                
                // });                        
            })
        }

    } catch (error) {
        console.log('join event error', error)
    }
    //return (hasJoined)
}

export default JoinEvent