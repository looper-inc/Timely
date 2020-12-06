import { StyleSheet, Alert, Image, SafeAreaView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import { Text, View } from '../components/Themed';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../providers/AuthProvider';

export const ProfileScreen = ({ navigation }) => {

    const db = firebase.firestore();
    const { currentUser } = useContext(AuthContext);
    const user = firebase.auth();

    useEffect(() => {
        console.log('user', currentUser)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.verticalButton}
                onPress={() => navigation.navigate('Edit Profile')}>
                <Image
                    source={require('../assets/images/pencil.jpeg')}
                    style={styles.pencil}
                />
            </TouchableOpacity>

            <Image
                source={currentUser.profileImgURL}
                style={styles.profile_picture}
            />
        </SafeAreaView>
    )
}

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
    pencil: {
        width: 40,
        height: 40,
    },
    profile_picture: {

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
    alertText: {
        margin: 5,
        color: '#ff7979',
        fontSize: 12,
        marginTop: 0,
        fontWeight: 'bold'
    }
});