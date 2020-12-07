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

const db = firebase.firestore();
const fStorage = firebase.storage();

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    verticalButton: {

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
    buttonText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#ffffff"
      },
    alertText: {
        margin: 5,
        color: '#ff7979',
        fontSize: 12,
        marginTop: 0,
        fontWeight: 'bold'
    }
});


export const ProfileScreen = ({ navigation }) => {

    const db = firebase.firestore();
    const { currentUser } = useContext(AuthContext);
    const user = firebase.auth();
    console.log('user', currentUser)
    function handleSignOut() {
        firebase.auth().signOut();
      }
    
    const image = null
    const email = currentUser.email
    const name = currentUser.displayName? currentUser.displayName : "Not yet set"
    const pass = currentUser.email

    return (
<SafeAreaView style={styles.container}>
        {image && 
          <Image
            source={{ uri: image }}
            style={styles.defaultPic}
          />}
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <TouchableOpacity
      style={styles.buttonContainer}>
      <Text style={styles.buttonText}>View Password</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
    <FormButton
        buttonTitle="Sign Out" onPress={handleSignOut}
      />
        </SafeAreaView>
    )
}
