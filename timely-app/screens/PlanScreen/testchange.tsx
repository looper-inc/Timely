//FLow
//First user enters old password. Then firebase checks if the password is correct, if not retype password.
//Then create a new password and save that password for that user.
/*
import { StyleSheet, TextInput, Alert, Image, SafeAreaView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import * as Yup from 'yup';
import { Text, View } from '../components/Themed';
import { Formik } from 'formik';
import React, { useContext, useState} from 'react'
import {AuthContext} from "../providers/AuthProvider"

export const ResetPasswordScreen = ({navigation}) => { 

    const db = firebase.firestore();
    const {currentUser} = useContext(AuthContext);
    const initialValues = {
        password: '',
        newpassword:''
        
    }

    const ChangePasswordValidationSchema = Yup.object().shape({
        password: Yup
        .string()
        .required('Password is required'),
    })

  

      onChangePasswordPress

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.topText}>Old Password</Text>   
            <Formik
                initialValues={initialValues}
                validationSchema={ChangePasswordValidationSchema}
                onSubmit={(values: any) => { handleChange(values.password) }}
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
                        labelValue={values.password}
                        onChangeText={handleChange('password')}
                        placeholderText="Password"
                        iconType="lock"
                        secureTextEntry={true}
                        onBlur={handleBlur('password')}
                         />

                        {
                            (errors.password && touched.password) &&
                            <Text style={styles.alertText}>{errors.password}</Text>
                        }

                                  
                            </>
                        )}
                </Formik>


                <Text style={styles.topText}>New Password</Text>   
            <Formik
                initialValues={initialValues}
                validationSchema={ChangePasswordValidationSchema}
                onSubmit={(values: any) => { handleChange(values) }}
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
                        labelValue={values.newpassword}
                        onChangeText={(text) => {values.newpassword = text} } //does this work?
                        placeholderText="NewPassword"
                        iconType="lock"
                        secureTextEntry={true}
                        onBlur={handleBlur('password')}
                         />

                        {
                            (errors.password && touched.password) &&
                            <Text style={styles.alertText}>{errors.password}</Text>
                        }

                            <FormButton
                                buttonTitle="Change Password"
                                onPress={onChangePasswordPress}
                                disabled={!(isValid)}
                            />      
                            </>
                        )}
                </Formik>

            

                


            </SafeAreaView>
        )
    };
    



export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    topText: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
        marginBottom: 25,
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
*/