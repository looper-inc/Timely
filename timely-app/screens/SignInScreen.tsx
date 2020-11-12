import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useContext, useState} from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase, {googleProvider} from "../fbconfig"; 

export const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const db = firebase.firestore();

    function handleSignIn(){
        try{
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password).then(() =>{
                console.log('SIGNED IN SUCCESSFULLY')
            }).catch((err) => {
                Alert.alert('OOPS!', err.message, [{text:'close'}])
                console.log(err)
            });
        } catch(err){
            console.log(err)
        }
    }
    function handleSigninWithGoogle(){
        try{
            firebase
                  .auth()
                  .signInWithPopup(googleProvider).then((res)=>{
                    //save user info to firestore
                    return db.collection('profiles').doc(res.user.uid).set(
                    {email: email}
                    )
                }).then(() =>{
                    console.log('SIGNED UP WITH GOOGLE PROVIDER SUCCESSFULLY')
                }).catch((err) => {
                    Alert.alert('OOPS!', err.message, [{text:'close'}])
                    console.log(err)
                });
                  
          } catch (error){
              alert(error);
          }
      
    }
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Timely</Text>
  
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
  
        <FormInput
          labelValue={password}
          onChangeText={(userPassword)=> setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />
  
        <FormButton
          buttonTitle="Sign In" onPress={handleSignIn}
        />
  
        <TouchableOpacity style={styles.verticalButton} onPress={handleSigninWithGoogle}>
          <Text style={styles.navButtonText}>Sign In with Google?</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.verticalButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.navButtonText}>
            Don't have an acount? Create here
          </Text>
        </TouchableOpacity>
      </View>
    )
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
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
      fontFamily: 'Roboto',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
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
      color: '#2e64e5',
      fontFamily: 'Roboto',
    },
  });
