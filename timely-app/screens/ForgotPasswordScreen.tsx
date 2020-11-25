import {StyleSheet, TouchableOpacity, Alert, Image, Button} from 'react-native';
import React, { useContext, useState} from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import * as Yup from 'yup';
import * as Google from 'expo-google-app-auth';
import {AuthContext} from "../providers/AuthProvider"
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { moveMessagePortToContext } from 'worker_threads';

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email')
  });

export const ForgotPasswordScreen = ({navigation}) => {
    const db = firebase.firestore();
    const {currentUser} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image
                source={require('..assets/images/padlock.png')}
                style={styles.padlock}
            />
            <Text style={styles.text}>
                Trouble Logging In?
            </Text>
            <Text style={styles.text}>
                Enter your UCSD email and we'll send you a link to get back in your account.
            </Text>
            <TextInput style={styles.textInput}>

            </TextInput>
            <Button 
                title="Send Login Link" 
                onPress={() => ""}
            />
            <Text>
                OR
            </Text>
            <Button
                title="Create a New Account"
                onPress={() => ""}
            />
        </View>
    )
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {

    },
    padlock: {

    },
    text: {

    },
    textInput: {

    }
});