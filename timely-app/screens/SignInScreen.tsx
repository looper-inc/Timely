import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useState } from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import * as Google from 'expo-google-app-auth';

export const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const db = firebase.firestore();

  function handleSignIn() {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password).then(() => {
          console.log('SIGNED IN SUCCESSFULLY')
        }).catch((err) => {
          Alert.alert('OOPS!', err.message, [{ text: 'close' }])
          console.log(err)
        });
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSignInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '953645514664-3j4ed83dtshv3bpuagshrq99gbcpa0v6.apps.googleusercontent.com',
        iosClientId: '953645514664-nabr329ih9vkf53l4ghh5a1060ihaec3.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {

        onSignIn(result)

      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then((res) => {
            //save user info to firestore
            if (res.user)
              return db.collection('profiles').doc(res.user.uid).set(
                {
                  email: res.user.email,
                  first_name: googleUser.user.givenName,
                  last_name: googleUser.user.familyName,
                  profile_visibility: true,
                  profileImgURL: googleUser.user.photoUrl,
                  status: 0,
                  notification: false
                }
              )
          }).then(() => {
            console.log('SIGNED UP WITH GOOGLE PROVIDER SUCCESSFULLY')
          }).catch(error => {
            console.log("google provider error:", error);
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
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
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In" onPress={handleSignIn}
      />

      <TouchableOpacity style={styles.verticalButton} onPress={handleSignInWithGoogleAsync}>
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
})
