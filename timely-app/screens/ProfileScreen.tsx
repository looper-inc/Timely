import {
    SafeAreaView, Switch, StyleSheet, ScrollView, TextInput, Image, Platform, Dimensions, TouchableWithoutFeedback
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";

import { Text, View } from '../components/Themed';
import FormButton from '../components/FormButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import placeholder from '../assets/images/proplaceholder.jpg'
import EditProfileScreen from './EditProfileScreen';

const db = firebase.firestore();
const fStorage = firebase.storage();

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    verticalButton: {

    },
    defaultPic: {
        backgroundColor: "#dcdde1",
        height: windowHeight / 4,
        width: windowHeight / 4,
        borderColor: "#ccc",
        borderRadius: windowHeight / 4 / 2,
        borderWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginHorizontal: 20,
        marginTop:10,
        marginBottom:50
      },
    cog: {
        width: 50,
        height: 50,
    },
    profile_picture: {

    },
    buttonContainer: {
        backgroundColor: "#2e64e5",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3
      },
    bottomText: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 14,
        color: '#000000',
        marginBottom: 25,
    },
    textInput: {

    },
    dispText: {
        fontSize: 18,
        color: "#fefefe",
        margin: 20
      },
    buttonText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#ffffff"
      },
      button1: {
      },
    alertText: {
        margin: 5,
        color: '#ff7979',
        fontSize: 12,
        marginTop: 0,
        fontWeight: 'bold'
    }
});

const ProfileScreen = ({ navigation }) => {

    const db = firebase.firestore();
    const { currentUser } = useContext(AuthContext);
    const user = firebase.auth();
    const [profile, setProfile] = useState<any>({})
    console.log('user', currentUser)
    function handleSignOut() {
        firebase.auth().signOut();
    }


    useEffect(() => { 
          db.collection('profiles').doc(currentUser.uid).get().then(snapshot => {
          const profile = snapshot.data();
          setProfile(profile)
          })
        }, [])
    

    const image = currentUser.profileImgURL ? currentUser.profileImgURL: placeholder
    const email = currentUser.email
    const bio = currentUser.bio
    const name = currentUser.displayName? currentUser.displayName : "Not yet set"

    return (
<SafeAreaView style={styles.container}>
        {image && 
          <Image
            source={{ uri: profile.profileImgURL }}
            style={styles.defaultPic}
          />}
            <Text style={styles.dispText}>Name: {name}</Text>
            <Text style={styles.dispText}>Email: {email}</Text>
            <Text style={styles.dispText}>Bio: {profile.bio}</Text>
            <FormButton buttonTitle="Change Password" onPress={()=>{navigation.navigate("EditProfile")}}/>
            <FormButton buttonTitle="Sign Out" onPress={handleSignOut}/>
          
        </SafeAreaView>
    )
}

export default ProfileScreen;
