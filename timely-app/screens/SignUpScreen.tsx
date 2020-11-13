import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useContext, useState } from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";

export const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comPassword, setComPassword] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [comPasswordErr, setComPasswordErr] = useState('');

  const db = firebase.firestore();

  function handleSignUp() {
    if (email.length == 0) {
      setEmailErr('Email cannot be blank!')
    } else if (password.length < 6 || comPassword.length < 6) {
      setPasswordErr('Password must be greater than 5 characters');
      setComPasswordErr('Password must be greater than 5 characters');
    } else {
      try {
        firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        ).then((res) => {
          //save user info to firestore
          if (res.user)
            return db.collection('profiles').doc(res.user.uid).set(
              { email: email }
            )
        }).then(() => {
          console.log('SIGNED UP SUCCESSFULLY')
        }).catch(function (err) {
          // Handle Errors here.
          Alert.alert('OOPS!', err.message, [{ text: 'close' }])
          console.log(err)
        });
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create An Account.</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {emailErr ? <Text style={styles.alertText}>{emailErr}</Text> : null}

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {passwordErr ? <Text style={styles.alertText}>{passwordErr}</Text> : null}

      <FormInput
        labelValue={comPassword}
        onChangeText={(comfirmed) => setComPassword(comfirmed)}
        placeholderText="Comfirmed Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {comPasswordErr ? <Text style={styles.alertText}>{comPasswordErr}</Text> : null}

      <FormButton
        buttonTitle="Sign Up" onPress={handleSignUp}
      />

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
  alertText: {
    marginBottom: 10,
    color: '#ff7979',
    fontSize: 12,
    marginTop: 0,
  }
});
