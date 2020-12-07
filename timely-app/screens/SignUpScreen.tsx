import { StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useState} from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig"; 
import { Formik } from "formik";
import * as Yup from "yup";
import { Text, View } from '../components/Themed';

export const SignUpScreen = ({navigation}) => {

    const db = firebase.firestore();

    /****** VALIDATION using Formik and Yup ******/  
    const initialValues = {
      email: '',
      password: '',
      confirmPassword: ''
    }
    
    // With Yup validationSchema
    const signUpValidationSchema = Yup.object().shape({
      email: Yup.string()
          .email("Please enter valid email")
          .required('Email Address is Required'),
      password: Yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
      confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
    })

    function handleSignUp(values){

      try{
          firebase.auth().createUserWithEmailAndPassword(
            values.email,
            values.password
          ).then((res)=>{
              //save user info to firestore
              return db.collection('profiles').doc(res.user.uid).set(
                  {
                      email: res.user.email,
                      profile_visibility: true,
                      status: 0,
                      notification: false,
                      created: Date.now()
                  }
              )
          }).then(() =>{
              console.log('SIGNED UP SUCCESSFULLY')
          }).catch(function(err) {
              // Handle Errors here.
              Alert.alert('OOPS!', err.message, [{text:'TRY AGAIN!'}])
              console.log(err)
          });
      }catch(err){
          console.log(err)
      }
        
    }

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Create An Account</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={(values) => { handleSignUp(values) }}
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

            <FormInput
              labelValue={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              placeholderText="Confirm Password"
              iconType="lock"
              secureTextEntry={true}
              onBlur={handleBlur('confirmPassword')}
            />

            {
              (errors.confirmPassword && touched.confirmPassword) &&  
              <Text style={styles.alertText}>{errors.confirmPassword}</Text>
            }

            <FormButton
              buttonTitle="Sign Up"
              onPress={handleSubmit} 
              disabled={!(isValid)}
            />
            </>
          )}
        </Formik>

        <TouchableOpacity
          style={styles.verticalButton}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.navButtonText}>
            Have an acount? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    )
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000000',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
      fontSize: 28,
      marginBottom: 10,
      color: '#ffffff',
    },
    navButton: {
      marginTop: 15,
    },
    verticalButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff',
    },
    alertText:{
      margin: 5,
      color: '#ff7979',
      fontSize: 12,
      marginTop: 0,
      fontWeight: 'bold'
    },
  });
