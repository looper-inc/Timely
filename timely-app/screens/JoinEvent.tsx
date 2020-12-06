import firebase from "../fbconfig";

const JoinEvent = async (friend_id, event_id) => {
    var db
    db = firebase.firestore()
    var user = firebase.auth().currentUser; // user might be null

    try {
        // check if user has already added the event by checking
        // field firend_id, change line 31 to change identifier
        var members = await db.collection('events').doc(friend_id)
            .collection('list').doc(event_id).collection('members').get()
        const membersId = members.docs.map(doc => doc.data())
        var hasJoined = false
        
        membersId.forEach(element => {
            if(element.friend_id == user.uid){
                hasJoined = true
            }
        });
        if(hasJoined){ 
            console.log("You already Joined")
            // Need to pop up a window
        } else {
            //add my id to the partisapant list
            // NOTE: if you need to change the format of partisapant id,
            // content in the .add need to be changed with
            db.collection('events').doc(friend_id)
                .collection('list').doc(event_id).collection('members')
                .add({friend_id: user.uid});
            //get partisapant list
            members = await db.collection('events').doc(friend_id)
                .collection('list').doc(event_id).collection('members').get()
            const membersId = members.docs.map(doc => doc.data())

            db.collection('events').doc(friend_id)
                .collection('list').doc(event_id).get().then((doc) => {
                var data
                data = doc.data()
                db.collection('events').doc(user.uid).
                collection('list').add(data).then((dataRef) => {
                    console.log("this is a log1" + membersId)
                    membersId.forEach(element => {
                        db.collection('events').doc(user.uid).collection('list')
                        .doc(dataRef.id).collection('members').add(element)
                        console.log("this is a log2" + element)
                    });
                
                });                        
            })
        }

    } catch (error) {
        console.log('join event error', error)
    }
}

export default JoinEvent