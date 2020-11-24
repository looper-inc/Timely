import {StyleSheet, TouchableOpacity, Alert, Image, Button} from 'react-native';
import React, { useContext, useState} from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import * as Yup from 'yup';
import * as Google from 'expo-google-app-auth';
import {AuthContext} from "../providers/AuthProvider"
import { Text, View } from '../components/Themed';
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { moveMessagePortToContext } from 'worker_threads';
import { ErrorMessage, Formik } from 'formik';

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email')
  });

export const ForgotPasswordScreen = ({navigation}) => {
    const db = firebase.firestore();
    const {currentUser} = useContext(AuthContext);

    function handleSendResetLink(email){
        console.log('is pressed??', email)
        try{

            /* TODO */


        } catch(err){
            console.log(err)
        }
    }

    const initialValues = {
        email: '',
    }

    const ForgotPasswordValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
      })

    return (
        <View style={styles.container}>
            <Image
                source={require('..assets/images/padlock.png')}
                style={styles.padlock}
            />

            <Formik
                initialValues={initialValues}
                validationSchema={ForgotPasswordValidationSchema}
                onSubmit={(values) => { handleSendResetLink }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    touched
                }) => (
                    <>
                    <FormInput
                        labelValue={values.email}
                        onChangeText={handleChange('email')}
                        placeholderText="Email"
                        iconType="user"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onBlur={handleBlur('email')}
                    />

                    {
                        (errors.email && touched.email) &&
                        <Text style={styles.alertText}>{errors.email}</Text>
                    }

                    <FormButton
                        buttonTitle="Send Login Link"
                        onPress={handleSubmit}
                        disabled={!(isValid)}
                    />
                        </>
                )}
            </Formik>
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

    },
    alertText:{
        margin: 5,
        color: '#ff7979',
        fontSize: 12,
        marginTop: 0,
        fontWeight: 'bold'
      }
});